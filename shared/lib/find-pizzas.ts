import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 2000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIdArr = params.ingredients?.split(",").map(Number);
  const sortBy = params.sortBy;

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  let orderBy: { [key: string]: "asc" | "desc" } = { id: "desc" };

  if (sortBy) {
    switch (sortBy) {
      case "price-asc":
        orderBy = { createdAt: "asc" };
        break;
      case "price-desc":
        orderBy = { createdAt: "desc" };
        break;
      case "name-asc":
        orderBy = { name: "asc" };
        break;
      case "name-desc":
        orderBy = { name: "desc" };
        break;
      default:
        orderBy = { id: "desc" };
    }
  }

  const allCategories = await prisma.category.findMany({
    include: {
      products: {
        orderBy,
        where: {
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  const categories = ingredientsIdArr
    ? allCategories.map((category) => ({
        ...category,
        products: category.products.filter((product) => {
          const composition = (product.composition as number[] | null) || [];
          return ingredientsIdArr.every((ingredientId) =>
            composition.includes(ingredientId),
          );
        }),
      }))
    : allCategories;

  if (sortBy === "price-asc" || sortBy === "price-desc") {
    categories.forEach((category) => {
      category.products.sort((a, b) => {
        const pricesA = a.items.map((item) => item.price);
        const pricesB = b.items.map((item) => item.price);

        if (pricesA.length === 0 && pricesB.length === 0) return 0;
        if (pricesA.length === 0) return 1;
        if (pricesB.length === 0) return -1;

        const minPriceA = Math.min(...pricesA);
        const minPriceB = Math.min(...pricesB);
        return sortBy === "price-asc"
          ? minPriceA - minPriceB
          : minPriceB - minPriceA;
      });
    });
  }

  return categories;
};
