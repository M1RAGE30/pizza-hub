import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUserSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = parseInt(params.id);
    const { name, imageUrl, description, categoryId, variants } = await req.json();

    await prisma.productItem.deleteMany({
      where: { productId },
    });

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        imageUrl,
        description,
        categoryId,
        items: {
          create: variants.map((variant: any) => ({
            price: variant.price,
            size: variant.size,
            pizzaType: variant.pizzaType,
          })),
        },
      },
      include: {
        category: true,
        items: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[UPDATE_PRODUCT] Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUserSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = parseInt(params.id);

    await prisma.productItem.deleteMany({
      where: { productId },
    });

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE_PRODUCT] Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}