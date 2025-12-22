"use client";

import React from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminStats } from "./admin-stats";
import { AdminUsersTable } from "./admin-users-table";
import { AdminProductsTable } from "./admin-products-table";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("stats");

  const renderContent = () => {
    switch (activeTab) {
      case "stats":
        return <AdminStats />;
      case "users":
        return <AdminUsersTable />;
      case "products":
        return <AdminProductsTable />;
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Панель администратора
            </h1>
            <p className="text-gray-600 mt-2">
              Управление системой Pizza Hub
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};