import { ConditionalHeader } from "@/shared/components/shared/conditional-header";
import { Footer } from "@/shared/components/shared/footer";
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
    <main className="min-h-screen flex flex-col">
      <Suspense>
        <ConditionalHeader />
      </Suspense>
      <div className="flex-1">{children}</div>
      {modal}
      <Footer />
    </main>
  );
}
