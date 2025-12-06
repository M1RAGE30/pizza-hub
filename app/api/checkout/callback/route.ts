import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-temapltes/order-success";
import { OrderFailedTemplate } from "@/shared/components/shared/email-temapltes/order-failed";
import { sendEmail } from "@/shared/lib";
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
      const items = JSON.parse(order?.items as string) as CartItemDTO[];

      if (isSucceeded) {
        await sendEmail(
          order.email,
          "Next Pizza / Ваш заказ успешно оформлен 🎉",
          OrderSuccessTemplate({ orderId: order.id, items }) as any
        );
      } else {
        await sendEmail(
          order.email,
          "Next Pizza / Оплата не прошла",
          OrderFailedTemplate({ orderId: order.id }) as any
        );
      }
    } catch (emailError) {
      console.log("[Checkout Callback] Email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse("Server error", 500, error);
  }
}
