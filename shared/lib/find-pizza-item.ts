import { ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const findPizzaItem = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize
): ProductItem | undefined => {
  return items.find((item) => item.pizzaType === type && item.size === size);
};

