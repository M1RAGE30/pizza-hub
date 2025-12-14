import { PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";
import { getPizzaSizeDetails } from "./get-pizza-size-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    details.push(getPizzaSizeDetails(pizzaSize, pizzaType));
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
