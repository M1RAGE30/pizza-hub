import { Header } from "@/shared/components";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Header hasSearch={false} hasCart={false} />
      {children}
    </main>
  );
}