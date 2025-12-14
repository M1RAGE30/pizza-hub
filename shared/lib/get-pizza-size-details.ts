import { PizzaSize, PizzaType, mapPizzaType } from "../constants/pizza";

export const getPizzaSizeDetails = (
  size: PizzaSize,
  type: PizzaType
): string => {
  return `${size} см, ${String(mapPizzaType[type]).toLowerCase()} тесто`;
};

