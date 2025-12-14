import { CartItemDTO } from "../services/dto/cart.dto";
import { getIngredientPrice } from "./get-ingredient-price";
import { PizzaSize } from "../constants/pizza";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  if (!item.productItem.size || !item.productItem.pizzaType) {
    const ingredientsPrice = item.ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    return (ingredientsPrice + item.productItem.price) * item.quantity;
  }

  const size = item.productItem.size as PizzaSize;
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + getIngredientPrice(ingredient, size),
    0
  );

  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
