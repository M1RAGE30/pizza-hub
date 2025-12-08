"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  TFormRegisterValues,
  formRegisterSchema,
} from "./modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/actions";
import { cn } from "@/shared/lib/utils";

interface Props {
  data: User;
}

const getProviderInfo = (provider: string | null) => {
  if (!provider) return null;

  const providers = {
    google: {
      name: "Google",
      icon: "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg",
      color: "bg-white",
      textColor: "text-gray-700",
    },
  };

  return providers[provider as keyof typeof providers] || null;
};

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const isOAuthUser = Boolean(data.provider);
  const providerInfo = getProviderInfo(data.provider);

  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: isOAuthUser ? data.email : formData.email,
        fullName: formData.fullName,
        password: isOAuthUser ? undefined : formData.password,
      });

      toast.success("Данные обновлены", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Ошибка при обновлении данных", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <div className="flex items-center justify-between mb-6">
        <Title text="Личные данные" size="md" className="font-bold" />
        {providerInfo && (
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border",
              providerInfo.color,
              providerInfo.textColor
            )}
          >
            <img
              src={providerInfo.icon}
              alt={providerInfo.name}
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">
              Вход через {providerInfo.name}
            </span>
          </div>
        )}
      </div>

      {isOAuthUser && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ Информация:</strong> Вы вошли через {providerInfo?.name}.
            Email и пароль управляются через ваш {providerInfo?.name} аккаунт и
            не могут быть изменены здесь.
          </p>
        </div>
      )}

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name="email"
            label="E-Mail"
            required
            disabled={isOAuthUser}
            className={isOAuthUser ? "cursor-not-allowed opacity-60" : ""}
          />
          <FormInput name="fullName" label="Полное имя" required />

          {!isOAuthUser && (
            <>
              <FormInput
                type="password"
                name="password"
                label="Новый пароль"
                required
              />
              <FormInput
                type="password"
                name="confirmPassword"
                label="Повторите пароль"
                required
              />
            </>
          )}

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
