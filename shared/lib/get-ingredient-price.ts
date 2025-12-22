import { Ingredient } from "@prisma/client";
import { PizzaSize } from "../constants/pizza";

const convertToBYN = (rubPrice: number): number => {
  return Math.round(rubPrice / 30);
};

export const getIngredientPrice = (
  ingredient: Ingredient,
  size: PizzaSize
): number => {
  const basePrice = ingredient.price;

  const sizeBasedPrices: Record<string, Record<PizzaSize, number>> = {
    "Пряная говядина": {
      20: convertToBYN(59),
      25: convertToBYN(99),
      30: convertToBYN(119),
      35: convertToBYN(155),
    },
    Моцарелла: {
      20: convertToBYN(55),
      25: convertToBYN(79),
      30: convertToBYN(90),
      35: convertToBYN(115),
    },
    "Сыры чеддер и пармезан": {
      20: convertToBYN(49),
      25: convertToBYN(69),
      30: convertToBYN(79),
      35: convertToBYN(99),
    },
    "Сыр блю чиз": {
      20: convertToBYN(59),
      25: convertToBYN(99),
      30: convertToBYN(149),
      35: convertToBYN(199),
    },
    "Острый перец халапеньо": {
      20: convertToBYN(39),
      25: convertToBYN(49),
      30: convertToBYN(59),
      35: convertToBYN(79),
    },
    "Нежный цыпленок": {
      20: convertToBYN(49),
      25: convertToBYN(69),
      30: convertToBYN(79),
      35: convertToBYN(99),
    },
    Шампиньоны: {
      20: convertToBYN(39),
      25: convertToBYN(49),
      30: convertToBYN(59),
      35: convertToBYN(79),
    },
    Бекон: {
      20: convertToBYN(49),
      25: convertToBYN(69),
      30: convertToBYN(79),
      35: convertToBYN(99),
    },
    Ветчина: {
      20: convertToBYN(49),
      25: convertToBYN(79),
      30: convertToBYN(79),
      35: convertToBYN(99),
    },
    "Пикантная пепперони": {
      20: convertToBYN(59),
      25: convertToBYN(69),
      30: convertToBYN(79),
      35: convertToBYN(99),
    },
    "Острая чоризо": {
      20: convertToBYN(49),
      25: convertToBYN(69),
      30: convertToBYN(79),
      35: convertToBYN(99),
    },
    "Маринованные огурчики": {
      20: convertToBYN(39),
      25: convertToBYN(49),
      30: convertToBYN(59),
      35: convertToBYN(79),
    },
    "Свежие томаты": {
      20: convertToBYN(39),
      25: convertToBYN(49),
      30: convertToBYN(59),
      35: convertToBYN(79),
    },
    "Красный лук": {
      20: convertToBYN(39),
      25: convertToBYN(49),
      30: convertToBYN(59),
      35: convertToBYN(79),
    },
    "Сочные ананасы": {
      20: convertToBYN(39),
      25: convertToBYN(59),
      30: convertToBYN(79),
      35: convertToBYN(79),
    },
    "Итальянские травы": {
      20: convertToBYN(19),
      25: convertToBYN(29),
      30: convertToBYN(39),
      35: convertToBYN(59),
    },
    "Сладкий перец": {
      20: convertToBYN(39),
      25: convertToBYN(49),
      30: convertToBYN(59),
      35: convertToBYN(79),
    },
    "Кубики брынзы": {
      20: convertToBYN(49),
      25: convertToBYN(69),
      30: convertToBYN(79),
      35: convertToBYN(99),
    },
    "Баварские колбаски": {
      20: convertToBYN(59),
      25: convertToBYN(119),
      30: convertToBYN(129),
      35: convertToBYN(159),
    },
    Креветки: {
      20: convertToBYN(115),
      25: convertToBYN(205),
      30: convertToBYN(229),
      35: convertToBYN(250),
    },
    "Свиная шейка": {
      20: convertToBYN(115),
      25: convertToBYN(205),
      30: convertToBYN(229),
      35: convertToBYN(250),
    },
    "Сырный бортик": {
      20: 0,
      25: 0,
      30: convertToBYN(205),
      35: convertToBYN(229),
    },
  };

  const sizePrices = sizeBasedPrices[ingredient.name];
  if (sizePrices) {
    return sizePrices[size] || basePrice;
  }

  return basePrice;
};
