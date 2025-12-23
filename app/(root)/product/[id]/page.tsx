import {
  Container,
  Filters,
  Title,
  TopBar,
  ProductsGroupList,
  Stories,
  ChooseProductModal,
} from "@/shared/components";
import { Suspense } from "react";
import { findPizzas } from "@/shared/lib/find-pizzas";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findFirst({
      where: { id: Number(resolvedParams.id) },
      include: {
        ingredients: true,
        items: true,
      },
    }),
    findPizzas({}),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Container className="mt-10">
        <Title text="Категории" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>

      <ChooseProductModal product={product} />
    </>
  );
}
