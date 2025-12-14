import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";
import { calcCartItemTotalPrice } from "@/shared/lib/calc-cart-item-total-price";
import {
  calculateTotalPrice,
  calculateVatPrice,
  DELIVERY_PRICE,
} from "@/shared/constants/checkout";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({
  orderId,
  items,
}): React.ReactElement => {
  const cartAmount = items.reduce(
    (sum, item) => sum + calcCartItemTotalPrice(item),
    0
  );
  const vatPrice = calculateVatPrice(cartAmount);
  const totalAmount = calculateTotalPrice(cartAmount);

  return (
    <div>
      <h1>Спасибо за покупку! 🎉</h1>

      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

      <hr />

      <ul>
        {items.map((item) => {
          const itemTotalPrice = calcCartItemTotalPrice(item);
          return (
            <li key={item.id}>
              {item.productItem.product.name} | {itemTotalPrice} ₽ x{" "}
              {item.quantity} шт. = {itemTotalPrice} ₽
            </li>
          );
        })}
      </ul>

      <hr />
      <p>Стоимость корзины: {cartAmount} ₽</p>
      <p>Налоги: {vatPrice} ₽</p>
      <p>Доставка: {DELIVERY_PRICE} ₽</p>
      <p>
        <b>Итого: {totalAmount} ₽</b>
      </p>
    </div>
  );
};
