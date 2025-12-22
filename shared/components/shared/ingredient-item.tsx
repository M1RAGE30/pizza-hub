import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";
import { formatPrice } from "@/shared/lib/format-price";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  disabled,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative shadow-md bg-white h-full",
        { 
          "border border-primary": active,
          "opacity-50 cursor-not-allowed": disabled,
          "cursor-pointer": !disabled,
        },
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img width={110} height={110} src={imageUrl} className={disabled ? "grayscale" : ""} />
      <span className="text-xs mb-1 flex-grow flex items-center justify-center">{name}</span>
      <span className="font-bold mt-auto">{formatPrice(price)} BYN</span>
    </div>
  );
};
