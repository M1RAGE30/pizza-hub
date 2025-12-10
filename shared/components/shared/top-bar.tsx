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

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const rafIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    setIsMounted(true);
    
    const checkScroll = () => {
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 100);
      }
    };

    checkScroll();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    window.addEventListener("resize", checkScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
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
          {isMounted && (
            <div
              className={cn(
                "transition-all duration-500 ease-out",
                isScrolled
                  ? "opacity-100 translate-x-0 w-auto"
                  : "opacity-0 translate-x-4 w-0 overflow-hidden pointer-events-none"
              )}
            >
              <div className="whitespace-nowrap">
                <CartButton />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
