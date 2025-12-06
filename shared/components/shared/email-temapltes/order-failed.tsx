import React from "react";

interface Props {
  orderId: number;
}

export const OrderFailedTemplate: React.FC<Props> = ({ orderId }) => (
  <div>
    <h1>Оплата не прошла ❌</h1>

    <p>К сожалению, оплата заказа #{orderId} не была завершена.</p>

    <p>
      Если у вас возникли проблемы с оплатой, пожалуйста, попробуйте оформить
      заказ заново или свяжитесь с нашей службой поддержки.
    </p>
  </div>
);
