import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";

export async function GET(_req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[ADMIN_PRODUCTS] Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, imageUrl, description, categoryId, variants } = await req.json();

    const product = await prisma.product.create({
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
    console.error("[CREATE_PRODUCT] Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}