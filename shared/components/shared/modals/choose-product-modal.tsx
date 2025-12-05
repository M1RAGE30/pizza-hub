"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle className="sr-only">
          {product ? `Опции для ${product.name}` : "Настройка товара"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Настройка товара перед добавлением в корзину.
        </DialogDescription>
        {product && (
          <ProductForm product={product} onSubmit={() => router.back()} />
        )}
      </DialogContent>
    </Dialog>
  );
};
