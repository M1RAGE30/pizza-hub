import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/shared/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== OrderStatus.PENDING) {
      return NextResponse.json({
        success: true,
        message: "Order already processed",
      });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    try {
      const items = JSON.parse(order.items as string) as CartItemDTO[];

      const { sendEmail } = await import("@/shared/lib/send-email");

      if (isSucceeded) {
        const { OrderSuccessTemplate } = await import("@/shared/components/shared/email-temapltes/order-success");
        await sendEmail(
          order.email,
          "Pizza Hub / Ваш заказ успешно оформлен",
          OrderSuccessTemplate({ orderId: order.id, items })
        );
      } else {
        const { OrderFailedTemplate } = await import("@/shared/components/shared/email-temapltes/order-failed");
        await sendEmail(
          order.email,
          "Pizza Hub / Оплата не прошла #" + order.id,
          OrderFailedTemplate({ 
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: `${process.env.NEXTAUTH_URL}/checkout`
          })
        );
      }
    } catch (emailError) {
      console.error("[Checkout Callback] Email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse("Server error", 500, error);
  }
}
