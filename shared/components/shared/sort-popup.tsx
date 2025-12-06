"use client";

import { cn } from "@/shared/lib/utils";
import { ArrowUpDown, Check } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

const sortOptions = [
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "name-asc", label: "Название: А-Я" },
  { value: "name-desc", label: "Название: Я-А" },
];

export const SortPopup: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);

  const currentSort = searchParams.get("sortBy");
  const currentLabel = currentSort
    ? sortOptions.find((opt) => opt.value === currentSort)?.label
    : null;

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", value);

    router.push(`/?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors",
            className
          )}
        >
          <ArrowUpDown size={16} />
          <b>Сортировка:</b>
          <b className={currentLabel ? "text-primary" : "text-gray-400"}>
            {currentLabel || "Выбрать"}
          </b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end">
        <div className="flex flex-col">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors",
                currentSort === option.value && "bg-gray-50"
              )}
            >
              <span>{option.label}</span>
              {currentSort === option.value && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
