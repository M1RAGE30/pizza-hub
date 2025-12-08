'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import { VerificationCodeForm } from './verification-code-form';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
  onShowVerification?: (show: boolean) => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin, onShowVerification }) => {
  const [showVerification, setShowVerification] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    onShowVerification?.(showVerification);
  }, [showVerification, onShowVerification]);

  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      setUserEmail(data.email);
      setShowVerification(true);
    } catch (error: any) {
      const errorMessage = error?.message || 'Ошибка при регистрации';
      return toast.error(errorMessage, {
        icon: '❌',
      });
    }
  };

  const handleVerificationSuccess = () => {
    toast.success('Регистрация успешна', {
      icon: '✅',
    });
    onClose?.();
  };

  if (showVerification) {
    return (
      <VerificationCodeForm email={userEmail} onSuccess={handleVerificationSuccess} />
    );
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
