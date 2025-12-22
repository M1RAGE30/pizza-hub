import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { formatPrice } from "@/shared/lib/format-price";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string | null;
  categoryId?: number;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  categoryId,
  className,
}) => {
  const isPizza = categoryId === 1; // Категория пиццы имеет ID = 1

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Link href={`/product/${id}`} className="flex flex-col h-full">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px] flex-shrink-0">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-2 mt-3 font-bold flex-shrink-0" />

        <div className="min-h-[48px] mb-4 flex-shrink-0">
          {description ? (
            <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto flex-shrink-0">
          <span className="text-[20px]">
            {isPizza ? "от " : ""}<b>{formatPrice(price)} BYN</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
