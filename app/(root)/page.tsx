import {
  Container,
  Filters,
  Title,
  TopBar,
  ProductsGroupList,
  Stories,
} from "@/shared/components";
import { Suspense } from "react";
import { GetSearchParams, findPizzas } from "@/shared/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await findPizzas(resolvedSearchParams);

  const hasProducts = categories.some(
    (category) => category.products.length > 0,
  );
  const hasFilters = Object.keys(resolvedSearchParams).length > 0;

  return (
    <>
      <Container className="mt-10">
        <Title text="Категории" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0,
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
            {!hasProducts && hasFilters ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🍕</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-gray-600 max-w-md">
                  К сожалению, по вашим критериям поиска не найдено ни одной
                  пиццы. Попробуйте изменить фильтры или сбросить их.
                </p>
              </div>
            ) : (
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
                    ),
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
