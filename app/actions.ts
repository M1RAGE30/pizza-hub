"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import {
  createAndSendVerificationCode,
  verifyVerificationCode,
} from "@/shared/lib/verification-code";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync, compare } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const { calculateTotalPrice } = await import("@/shared/constants/checkout");
    const totalPriceWithDeliveryAndTax = calculateTotalPrice(userCart.totalAmount);

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: totalPriceWithDeliveryAndTax,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа #" + order.id,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    try {
      const { sendEmail } = await import("@/shared/lib/send-email");
      const { PayOrderTemplate } = await import("@/shared/components/shared/email-temapltes/pay-order");

      await sendEmail(
        data.email,
        "Pizza Hub / Оплатите заказ #" + order.id,
        PayOrderTemplate({
          orderId: order.id,
          totalAmount: order.totalAmount,
          cartAmount: userCart.totalAmount,
          paymentUrl,
        })
      );
    } catch (emailError) {
      console.error("[CreateOrder] Email error (non-critical):", emailError);
    }

    return paymentUrl;
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
    throw err;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не найден");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (!findUser) {
      throw new Error("Пользователь не найден");
    }

    const isOAuthUser = Boolean(findUser.provider);
    const updateData: Prisma.UserUpdateInput = {
      fullName: body.fullName,
    };

    if (!isOAuthUser && body.email) {
      updateData.email = body.email;
    }

    if (!isOAuthUser && body.password) {
      updateData.password = hashSync(body.password as string, 10);
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: updateData,
    });
  } catch (err) {
    console.error("Error [UPDATE_USER]", err);
    throw err;
  }
}

export async function verifyCode(code: string) {
  try {
    await verifyVerificationCode(code);
  } catch (err) {
    console.error("Error [VERIFY_CODE]", err);
    const errorMessage =
      err instanceof Error ? err.message : "Ошибка при подтверждении кода";
    throw new Error(errorMessage);
  }
}

export async function checkUserAndResendCode(email: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    if (user.provider) {
      throw new Error("Этот аккаунт использует OAuth авторизацию");
    }

    if (!user.password) {
      throw new Error("Пароль не установлен");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Неверный пароль");
    }

    if (user.verified) {
      throw new Error("Почта уже подтверждена");
    }

    await createAndSendVerificationCode(user.id, user.email);
  } catch (err) {
    console.error("Error [CHECK_AND_RESEND_CODE]", err);
    const errorMessage =
      err instanceof Error ? err.message : "Ошибка при отправке кода";
    throw new Error(errorMessage);
  }
}

export async function resendVerificationCode(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    if (user.verified) {
      throw new Error("Почта уже подтверждена");
    }

    await createAndSendVerificationCode(user.id, user.email);
  } catch (err) {
    console.error("Error [RESEND_VERIFICATION_CODE]", err);
    const errorMessage =
      err instanceof Error ? err.message : "Ошибка при отправке кода";
    throw new Error(errorMessage);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        await createAndSendVerificationCode(user.id, user.email);
        return;
      }

      throw new Error("Пользователь с таким email уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    await createAndSendVerificationCode(createdUser.id, createdUser.email);
  } catch (err) {
    console.error("Error [CREATE_USER]", err);
    const errorMessage =
      err instanceof Error ? err.message : "Ошибка при регистрации";
    throw new Error(errorMessage);
  }
}
