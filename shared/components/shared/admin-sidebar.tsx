"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { BarChart3, Users, Package, Pizza, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    id: "stats",
    label: "Статистика",
    icon: BarChart3,
  },
  {
    id: "users",
    label: "Пользователи",
    icon: Users,
  },
  {
    id: "products",
    label: "Продукты",
    icon: Package,
  },
];

export const AdminSidebar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Pizza className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pizza Hub</h2>
            <p className="text-sm text-gray-500">Админ панель</p>
          </div>
        </div>
      </div>

      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeTab === item.id
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">На главную</span>
        </Link>
      </div>
    </div>
  );
};