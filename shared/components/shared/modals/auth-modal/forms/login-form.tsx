import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TFormLoginValues, formLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { checkUserAndResendCode } from "@/app/actions";
import { VerificationCodeForm } from "./verification-code-form";

interface Props {
  onClose?: VoidFunction;
  onShowVerification?: (show: boolean) => void;
}

export const LoginForm: React.FC<Props> = ({ onClose, onShowVerification }) => {
  const [showVerification, setShowVerification] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    onShowVerification?.(showVerification);
  }, [showVerification, onShowVerification]);

  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (resp?.ok) {
        toast.success("Вы успешно вошли в аккаунт", {
          icon: "✅",
        });
        onClose?.();
        return;
      }

      try {
        await checkUserAndResendCode(data.email, data.password);
        setUserEmail(data.email);
        setShowVerification(true);
        toast.success("Новый код подтверждения отправлен на вашу почту", {
          icon: "📧",
        });
      } catch (verificationError: any) {
        throw new Error("Неверный email или пароль");
      }
    } catch (error: any) {
      console.error("Error [LOGIN]", error);
      const errorMessage = error?.message || "Не удалось войти в аккаунт";
      toast.error(errorMessage, {
        icon: "❌",
      });
    }
  };

  const handleVerificationSuccess = () => {
    toast.success("Почта подтверждена! Теперь вы можете войти", {
      icon: "✅",
    });
    setShowVerification(false);
    form.reset();
  };

  if (showVerification) {
    return (
      <VerificationCodeForm
        email={userEmail}
        onSuccess={handleVerificationSuccess}
      />
    );
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
