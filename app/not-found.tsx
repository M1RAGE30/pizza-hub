import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Страница не найдена",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative w-full max-w-md mx-auto aspect-square">
          <Image
            src="/assets/images/not-found.png"
            alt="404 Страница не найдена"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
          <h2 className="text-3xl font-bold text-gray-800">
            Страница не найдена
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            К сожалению, страница, которую вы ищете, не существует или была
            перемещена.
          </p>
        </div>

        <div className="flex justify-center items-center pt-4">
          <Link href="/">
            <Button className="px-8 py-3 text-base">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

