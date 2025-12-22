import React from "react";
import { calculateVatPrice, DELIVERY_PRICE } from "@/shared/constants/checkout";
import { formatPrice } from "@/shared/lib/format-price";

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
  const cartTotal = cartAmount || 0;
  const vatPrice = calculateVatPrice(cartTotal);

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#ffffff',
      color: '#1f2937'
    }}>
      <div style={{
        backgroundColor: '#f97316',
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
          marginBottom: '32px'
        }}>
          <h2 style={{ 
            color: '#1f2937', 
            margin: '0 0 8px 0', 
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Заказ #{orderId}
          </h2>
          <p style={{ 
            color: '#6b7280', 
            margin: '0', 
            fontSize: '16px'
          }}>
            Ваш заказ оформлен и ожидает оплаты
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
            Детали оплаты
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', color: '#6b7280' }}>
              <span>Стоимость корзины:</span>
              <span style={{ color: '#1f2937', fontWeight: '500' }}>{formatPrice(cartTotal)} BYN</span>
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
              <span style={{ color: '#1f2937', fontWeight: '600' }}>Итого к оплате:</span>
              <span style={{ color: '#1f2937', fontWeight: '600' }}>{formatPrice(totalAmount)} BYN</span>
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <a 
            href={paymentUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#f97316',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Оплатить заказ
          </a>
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
            💡 Пожалуйста, оплатите заказ в течение 10 минут. После оплаты мы сразу начнем готовить вашу пиццу!
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
          После оплаты вы получите подтверждение
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
