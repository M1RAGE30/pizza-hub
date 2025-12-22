import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";
import { calcCartItemTotalPrice } from "@/shared/lib/calc-cart-item-total-price";
import {
  calculateTotalPrice,
  calculateVatPrice,
  DELIVERY_PRICE,
} from "@/shared/constants/checkout";
import { formatPrice } from "@/shared/lib/format-price";

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
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#ffffff',
      color: '#1f2937'
    }}>
      <div style={{
        backgroundColor: '#10b981',
        padding: '40px 32px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#ffffff', 
          margin: '0', 
          fontSize: '24px',
          fontWeight: '600',
          letterSpacing: '-0.025em'
        }}>
          🍕 Pizza Hub
        </h1>
      </div>
      
      <div style={{ padding: '40px 32px' }}>
        <div style={{
          backgroundColor: '#ecfdf5',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #d1fae5',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ 
            color: '#065f46', 
            margin: '0 0 8px 0', 
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Заказ успешно оплачен!
          </h2>
          <p style={{ 
            color: '#047857', 
            margin: '0', 
            fontSize: '16px'
          }}>
            Заказ #{orderId} на сумму {formatPrice(totalAmount)} BYN
          </p>
        </div>

        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            color: '#1f2937', 
            margin: '0 0 16px 0', 
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Ваш заказ
          </h3>
          <div style={{ fontSize: '14px' }}>
            {items.map((item, index) => {
              const itemTotalPrice = calcCartItemTotalPrice(item);
              return (
                <div key={item.id} style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none'
                }}>
                  <div>
                    <div style={{ 
                      color: '#1f2937',
                      fontWeight: '500',
                      marginBottom: '4px'
                    }}>
                      {item.productItem.product.name} × {item.quantity}
                    </div>
                    {item.ingredients.length > 0 && (
                      <div style={{ 
                        color: '#6b7280',
                        fontSize: '12px'
                      }}>
                        {item.ingredients.map(ing => ing.name).join(', ')}
                      </div>
                    )}
                  </div>
                  <div style={{ 
                    color: '#1f2937',
                    fontWeight: '600'
                  }}>
                    {formatPrice(itemTotalPrice)} BYN
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            color: '#1f2937', 
            margin: '0 0 16px 0', 
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Детали оплаты
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', color: '#6b7280' }}>
              <span>Стоимость корзины:</span>
              <span style={{ color: '#1f2937', fontWeight: '500' }}>{formatPrice(cartAmount)} BYN</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', color: '#6b7280' }}>
              <span>Налоги:</span>
              <span style={{ color: '#1f2937', fontWeight: '500' }}>{formatPrice(vatPrice)} BYN</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', color: '#6b7280' }}>
              <span>Доставка:</span>
              <span style={{ color: '#1f2937', fontWeight: '500' }}>{formatPrice(DELIVERY_PRICE)} BYN</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              margin: '16px 0 0 0',
              paddingTop: '16px',
              borderTop: '1px solid #e5e7eb',
              fontSize: '16px'
            }}>
              <span style={{ color: '#1f2937', fontWeight: '600' }}>Итого:</span>
              <span style={{ color: '#1f2937', fontWeight: '600' }}>{formatPrice(totalAmount)} BYN</span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #dbeafe'
        }}>
          <p style={{ 
            margin: '0', 
            color: '#1e40af',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            🚀 Мы уже начали готовить ваш заказ! Ожидайте доставку в течение 30-45 минут. Курьер свяжется с вами перед доставкой.
          </p>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        padding: '32px',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        <p style={{ 
          color: '#6b7280', 
          margin: '0 0 8px 0', 
          fontSize: '14px'
        }}>
          Спасибо за ваш заказ!
        </p>
        <p style={{ 
          color: '#1f2937', 
          margin: '0', 
          fontSize: '14px',
          fontWeight: '500'
        }}>
          С уважением, команда Pizza Hub
        </p>
      </div>
    </div>
  );
};
