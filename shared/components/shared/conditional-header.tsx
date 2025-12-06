"use client";

import { Header } from "./header";
import { usePathname } from "next/navigation";

export const ConditionalHeader = () => {
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";

  return <Header hasSearch={!isProfilePage} />;
};

