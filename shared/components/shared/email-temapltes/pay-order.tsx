import React from "react";
import { calculateVatPrice, DELIVERY_PRICE } from "@/shared/constants/checkout";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
  cartAmount?: number;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
  cartAmount,
}): React.ReactElement => {
  const cartTotal =
    cartAmount ||
    totalAmount -
      DELIVERY_PRICE -
      calculateVatPrice(totalAmount - DELIVERY_PRICE);
  const vatPrice = calculateVatPrice(cartTotal);

  return (
    <div>
      <h1>Заказ #{orderId}</h1>

      <p>
        Оплатите заказ. Перейдите <a href={paymentUrl}>по этой ссылке</a> для
        оплаты заказа.
      </p>

      <hr />

      <p>Стоимость корзины: {cartTotal} ₽</p>
      <p>Налоги: {vatPrice} ₽</p>
      <p>Доставка: {DELIVERY_PRICE} ₽</p>
      <p>
        <b>Итого к оплате: {totalAmount} ₽</b>
      </p>
    </div>
  );
};
