"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { CartButton } from "./cart-button";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}

const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 transition-all duration-300",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <div className="flex items-center gap-3">
          <SortPopup />
          <div
            className={cn(
              "transition-all duration-300 overflow-hidden",
              isScrolled
                ? "opacity-100 max-w-[200px] translate-x-0"
                : "opacity-0 max-w-0 -translate-x-4"
            )}
          >
            <CartButton />
          </div>
        </div>
      </Container>
    </div>
  );
};
