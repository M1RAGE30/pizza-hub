import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { getIngredientPrice } from "./get-ingredient-price";
import { findPizzaItem } from "./find-pizza-item";

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = findPizzaItem(items, type, size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + getIngredientPrice(ingredient, size), 0);

  return pizzaPrice + totalIngredientsPrice;
};
