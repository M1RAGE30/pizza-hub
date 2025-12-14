import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import React from "react";
import { Variant } from "../components/shared/group-variants";
import { useSet } from "react-use";
import { getAvailablePizzaSizes, findPizzaItem } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  availableTypes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(30);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailablePizzaSizes(type, items);

  const availableTypes = React.useMemo(() => {
    const filteredItemsBySize = items.filter((item) => item.size === size);
    const hasTraditional = filteredItemsBySize.some(
      (item) => item.pizzaType === 1
    );
    const hasThin = filteredItemsBySize.some((item) => item.pizzaType === 2);

    return [
      { name: "Традиционное", value: "1", disabled: !hasTraditional },
      { name: "Тонкое", value: "2", disabled: !hasThin },
    ];
  }, [size, items]);

  const currentItemId = findPizzaItem(items, type, size)?.id;

  React.useEffect(() => {
    const initialSizes = getAvailablePizzaSizes(1, items);
    const size30Available = initialSizes?.find(
      (item) => Number(item.value) === 30 && !item.disabled
    );

    if (size30Available) {
      setSize(30);
    } else {
      const availableSize = initialSizes?.find((item) => !item.disabled);
      if (availableSize) {
        setSize(Number(availableSize.value) as PizzaSize);
      }
    }
  }, [items]);

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type, availableSizes, size]);

  React.useEffect(() => {
    const isAvailableType = availableTypes.find(
      (item) => Number(item.value) === type && !item.disabled
    );
    const availableType = availableTypes.find((item) => !item.disabled);

    if (!isAvailableType && availableType) {
      setType(Number(availableType.value) as PizzaType);
    }
  }, [size]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    availableTypes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
