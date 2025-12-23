import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2-х символов" })
    .regex(/^[а-яА-ЯёЁa-zA-Z]+$/, {
      message: "Имя должно содержать только буквы",
    }),
  lastName: z
    .string()
    .min(2, { message: "Фамилия должна содержать не менее 2-х символов" })
    .regex(/^[а-яА-ЯёЁa-zA-Z]+$/, {
      message: "Фамилия должна содержать только буквы",
    }),
  email: z.string().email({ message: "Введите корректную почту" }),
  phone: z
    .string()
    .min(1, { message: "Введите номер телефона" })
    .refine(
      (phone) => {
        const cleanPhone = phone.replace(/\D/g, "");
        return cleanPhone.length >= 9;
      },
      { message: "Введите корректный номер телефона" }
    ),
  address: z.string().min(5, { message: "Введите корректный адрес" }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
