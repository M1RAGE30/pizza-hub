import { PaymentData } from "@/@types/yookassa";
import axios from "axios";
import { convertBYNToRUB } from "./currency-converter";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const rubAmount = convertBYNToRUB(details.amount);
  const rubAmountRounded = Math.round(rubAmount * 100) / 100; // Округляем до копеек
  
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: rubAmountRounded.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
}
