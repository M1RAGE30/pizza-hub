"use client";

import React from "react";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem } from "./ingredient-item";
import { cn } from "@/shared/lib/utils";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";
import { usePizzaOptions } from "@/shared/hooks";
import { getIngredientPrice } from "@/shared/lib/get-ingredient-price";
import { formatPrice } from "@/shared/lib/format-price";

interface Props {
  imageUrl: string;
  name: string;
  description?: string | null;
  composition?: number[] | null;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  description,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    availableTypes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const canAddCheeseBord = type === 1 && (size === 30 || size === 35);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  const handleIngredientClick = (ingredientId: number) => {
    addIngredient(ingredientId);
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-2" />

        <p className="text-gray-400 text-sm mb-3">{textDetaills}</p>

        {description && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={availableTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients
              .filter((ingredient) => {
                if (ingredient.name === "Сырный бортик") {
                  return canAddCheeseBord;
                }
                return true;
              })
              .map((ingredient) => {
                const ingredientPrice = getIngredientPrice(ingredient, size);
                return (
                  <IngredientItem
                    key={ingredient.id}
                    name={ingredient.name}
                    price={ingredientPrice}
                    imageUrl={ingredient.imageUrl}
                    onClick={() => handleIngredientClick(ingredient.id)}
                    active={selectedIngredients.has(ingredient.id)}
                  />
                );
              })}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          В корзину за {formatPrice(totalPrice)} BYN
        </Button>
      </div>
    </div>
  );
};
