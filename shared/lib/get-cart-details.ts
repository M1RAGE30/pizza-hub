import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
import { getIngredientPrice } from "./get-ingredient-price";
import { PizzaSize } from "../constants/pizza";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO | null): ReturnProps => {
  if (!data || !data.items) {
    return {
      items: [],
      totalAmount: 0,
    };
  }

  const items = data.items.map((item) => {
    const size = item.productItem.size as PizzaSize | null;
    const ingredients = size
      ? item.ingredients.map((ingredient) => ({
          name: ingredient.name,
          price: getIngredientPrice(ingredient, size),
        }))
      : item.ingredients.map((ingredient) => ({
          name: ingredient.name,
          price: ingredient.price,
        }));

    return {
      id: item.id,
      quantity: item.quantity,
      name: item.productItem.product.name,
      imageUrl: item.productItem.product.imageUrl,
      price: calcCartItemTotalPrice(item),
      pizzaSize: item.productItem.size,
      pizzaType: item.productItem.pizzaType,
      disabled: false,
      ingredients,
    };
  }) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
