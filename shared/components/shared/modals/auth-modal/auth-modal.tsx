"use client";

import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import { VerificationCodeForm } from "./forms/verification-code-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");
  const [showVerification, setShowVerification] = React.useState(false);
  const [verificationEmail, setVerificationEmail] = React.useState("");

  React.useEffect(() => {
    if (open) {
      const savedVerificationState = localStorage.getItem('verification-state');
      if (savedVerificationState) {
        try {
          const { email, timestamp } = JSON.parse(savedVerificationState);
          const elapsed = Date.now() - timestamp;
          if (elapsed < 10 * 60 * 1000) {
            setShowVerification(true);
            setVerificationEmail(email);
          } else {
            localStorage.removeItem('verification-state');
          }
        } catch (error) {
          localStorage.removeItem('verification-state');
        }
      }
    }
  }, [open]);

  const handleShowVerification = (email: string) => {
    setShowVerification(true);
    setVerificationEmail(email);
    localStorage.setItem('verification-state', JSON.stringify({
      email,
      timestamp: Date.now()
    }));
  };

  const handleVerificationSuccess = () => {
    setShowVerification(false);
    setVerificationEmail("");
    setType("login");
    localStorage.removeItem('verification-state');
  };

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    setShowVerification(false);
    setVerificationEmail("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        <DialogTitle className="sr-only">
          {type === "login" ? "Вход в аккаунт" : "Регистрация"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {type === "login"
            ? "Введите свою почту и пароль, чтобы войти в свой аккаунт"
            : "Заполните форму для регистрации нового аккаунта"}
        </DialogDescription>
        {showVerification ? (
          <VerificationCodeForm
            email={verificationEmail}
            onSuccess={handleVerificationSuccess}
          />
        ) : type === "login" ? (
          <LoginForm
            onClose={handleClose}
            onShowVerification={handleShowVerification}
          />
        ) : (
          <RegisterForm
            onClose={handleClose}
            onShowVerification={handleShowVerification}
          />
        )}

        {!showVerification && (
          <>
            <hr />
            <Button
              variant="secondary"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 w-full"
            >
              <img
                className="w-6 h-6"
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                alt="Google"
              />
              Google
            </Button>

            <Button
              variant="outline"
              onClick={onSwitchType}
              type="button"
              className="h-12"
            >
              {type !== "login" ? "Вход" : "Регистрация"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
