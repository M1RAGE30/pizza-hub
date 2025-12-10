"use client";

import React from "react";
import toast from "react-hot-toast";
import { verifyCode } from "@/app/actions";
import { Button } from "@/shared/components/ui";
import { Title } from "../../../title";
import Image from "next/image";
import { Input } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";

interface Props {
  email: string;
  onSuccess?: VoidFunction;
}

export const VerificationCodeForm: React.FC<Props> = ({ email, onSuccess }) => {
  const [codes, setCodes] = React.useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = React.useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newCodes = pastedData
      .split("")
      .concat(Array(6 - pastedData.length).fill(""));
    setCodes(newCodes.slice(0, 6));

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = codes.join("");

    if (code.length !== 6) {
      toast.error("Введите полный код из 6 цифр", {
        icon: "❌",
      });
      return;
    }

    try {
      setLoading(true);
      await verifyCode(code);

      toast.success("Почта подтверждена", {
        icon: "✅",
      });

      onSuccess?.();
    } catch (error: any) {
      const errorMessage = error?.message || "Ошибка при подтверждении кода";
      toast.error(errorMessage, {
        icon: "❌",
      });
      setCodes(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Title
            text="Подтверждение регистрации"
            size="md"
            className="font-bold"
          />
          <p className="text-gray-400 text-sm mt-2">
            Мы отправили код подтверждения на{" "}
            <strong className="text-gray-700">{email}</strong>
          </p>
        </div>
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-4">
          <Image
            src="/assets/images/numbers-icon.png"
            alt="Код подтверждения"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Код подтверждения <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 justify-center">
          {codes.map((code, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={cn(
                "w-12 h-12 text-center text-xl font-bold rounded-xl border-2",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                "transition-all duration-200",
                code ? "border-primary bg-primary/5" : "border-gray-300"
              )}
              disabled={loading}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">
          Введите код из письма, отправленного на вашу почту
        </p>
      </div>

      <Button loading={loading} className="h-12 text-base" type="submit">
        Подтвердить
      </Button>
    </form>
  );
};
