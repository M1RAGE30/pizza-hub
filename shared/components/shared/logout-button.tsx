"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui";
import { LogOut } from "lucide-react";

interface Props {
  className?: string;
}

export const LogoutButton: React.FC<Props> = ({ className }) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className={className}
      type="button"
    >
      <LogOut size={16} />
      Выйти
    </Button>
  );
};
