import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Title } from "./title";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({
  className,
  title,
  text,
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col md:flex-row items-center justify-center md:justify-between w-full max-w-[840px] gap-8 md:gap-12 px-4",
      )}
    >
      <div className="flex flex-col text-center md:text-left">
        <div className="w-full md:w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg mt-2">{text}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-8 md:mt-11">
          <Link href="/">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button
              variant="outline"
              className="text-gray-500 border-gray-400 hover:bg-gray-50 w-full sm:w-auto"
            >
              Обновить
            </Button>
          </a>
        </div>
      </div>

      {imageUrl && (
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            width={300}
            className="w-[200px] md:w-[300px] h-auto"
          />
        </div>
      )}
    </div>
  );
};
