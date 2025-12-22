import React from "react";
import { formatPrice } from "@/shared/lib/format-price";

interface Props {
  orderId: number;
  totalAmount?: number;
  paymentUrl?: string;
}

export const OrderFailedTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}): React.ReactElement => {
  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#ffffff',
      color: '#1f2937'
    }}>
      <div style={{
        backgroundColor: '#ef4444',
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
          backgroundColor: '#fef2f2',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #fecaca',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <h2 style={{ 
            color: '#dc2626', 
            margin: '0 0 8px 0', 
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Оплата не прошла
          </h2>
          <p style={{ 
            color: '#b91c1c', 
            margin: '0', 
            fontSize: '16px'
          }}>
            Заказ #{orderId}{totalAmount ? ` на сумму ${formatPrice(totalAmount)} BYN` : ''}
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
            Что произошло?
          </h3>
          <p style={{ 
            margin: '0', 
            color: '#6b7280',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            К сожалению, оплата вашего заказа не была завершена. Это могло произойти по техническим причинам или из-за недостатка средств на карте.
          </p>
        </div>

        {paymentUrl && (
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
              Попробовать снова
            </a>
          </div>
        )}

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
            💡 Если проблема повторяется, попробуйте использовать другую карту или обратитесь в службу поддержки вашего банка.
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
          Мы всегда готовы помочь!
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