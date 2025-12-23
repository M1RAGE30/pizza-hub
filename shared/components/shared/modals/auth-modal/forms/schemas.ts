import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен содержать минимум 6 символов" })
  .regex(/[A-Z]/, {
    message: "Пароль должен содержать хотя бы одну заглавную букву",
  })
  .regex(/[0-9]/, { message: "Пароль должен содержать хотя бы одну цифру" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: z.string().min(1, { message: "Введите пароль" }),
});

export const formRegisterSchema = z
  .object({
    email: z.string().email({ message: "Введите корректную почту" }),
    fullName: z
      .string()
      .min(2, { message: "Имя должно содержать минимум 2 символа" })
      .regex(/^[а-яА-ЯёЁa-zA-Z\s]+$/, {
        message: "Имя должно содержать только буквы",
      }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
