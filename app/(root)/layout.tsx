import { ConditionalHeader } from "@/shared/components/shared/conditional-header";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pizza Hub | Главная",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <ConditionalHeader />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
