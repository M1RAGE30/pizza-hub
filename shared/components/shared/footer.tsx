"use client";

import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const categories = ["Пиццы", "Завтрак", "Закуски", "Коктейли", "Кофе"];

  return (
    <footer className={cn("bg-neutral-900 text-white pt-10 pb-6", className)}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_1fr_1fr] gap-6 pb-8 border-b border-neutral-700">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <div>
                <h3 className="text-xl font-bold uppercase">Pizza Hub</h3>
                <p className="text-sm text-gray-400">вкусней уже некуда</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Доставляем вкуснейшую пиццу по всему Минску. Только свежие
              ингредиенты и быстрая доставка!
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Меню</h4>
            <ul className="space-y-2">
              {categories.map((name) => (
                <li key={name}>
                  <a
                    href={`/#${name}`}
                    className="text-gray-400 hover:text-primary transition"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+375 (25) 904-33-53</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin
                  size={18}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <span>г. Минск, ул. Уручская, д. 21В</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Режим работы</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Clock size={18} className="text-primary flex-shrink-0" />
                <div>
                  <p>Пн-Пт: 10:00 - 23:00</p>
                  <p>Сб-Вс: 11:00 - 00:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Pizza Hub. Все права защищены.
          </p>
        </div>
      </Container>
    </footer>
  );
};
