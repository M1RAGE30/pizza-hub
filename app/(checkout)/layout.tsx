import { Header, Footer } from "@/shared/components";
import { Suspense } from "react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE] flex flex-col">
      <Suspense>
        <Header
          hasSearch={false}
          hasCart={false}
          className="border-b-gray-200"
        />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Footer className="mt-auto" />
    </main>
  );
}
