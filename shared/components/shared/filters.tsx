"use client";

import React from "react";
import { Input } from "../ui";
import { Title, RangeSlider, CheckboxFiltersGroup } from "./";
import { useQueryFilters, useIngredients, useFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const excludedIngredients = [
    "Сырный бортик",
    "Пряная говядина",
    "Баварские колбаски",
    "Креветки",
    "Свиная шейка",
  ];

  const items = ingredients
    .filter((item) => !excludedIngredients.includes(item.name))
    .map((item) => ({
      value: String(item.id),
      text: item.name,
    }));

  const updatePrices = (prices: number[]) => {
    const [priceFrom, priceTo] = prices;

    if (priceFrom > 0) {
      filters.setPrices("priceFrom", priceFrom);
    } else {
      filters.setPrices("priceFrom", undefined);
    }

    if (priceTo < 50) {
      filters.setPrices("priceTo", priceTo);
    } else {
      filters.setPrices("priceTo", undefined);
    }
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "25 см", value: "25" },
          { text: "30 см", value: "30" },
          { text: "35 см", value: "35" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={50}
            value={String(filters.prices.priceFrom ?? 0)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={5}
            max={50}
            placeholder="50"
            value={String(filters.prices.priceTo ?? 50)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={50}
          step={1}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 50]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
