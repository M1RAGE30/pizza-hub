import React from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }): React.ReactElement => {
  const baseUrl = "http://localhost:3000";
  const verifyUrl = `${baseUrl}/api/auth/verify?code=${code}`;

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#ffffff'
    }}>
      <div style={{
        backgroundColor: '#f97316',
        padding: '30px 20px',
        textAlign: 'center',
        borderRadius: '12px 12px 0 0'
      }}>
        <h1 style={{ 
          color: '#ffffff', 
          margin: '0', 
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          🍕 Pizza Hub
        </h1>
        <p style={{ 
          color: '#ffffff', 
          margin: '10px 0 0 0', 
          fontSize: '16px',
          opacity: '0.9'
        }}>
          Подтверждение регистрации
        </p>
      </div>
      
      <div style={{ padding: '30px 20px' }}>
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '25px',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ 
            color: '#1e293b', 
            margin: '0 0 15px 0', 
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            Добро пожаловать!
          </h2>
          <p style={{ 
            color: '#64748b', 
            margin: '0', 
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            Спасибо за регистрацию в Pizza Hub! Для завершения регистрации необходимо подтвердить ваш email адрес.
          </p>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            color: '#92400e', 
            margin: '0 0 15px 0', 
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Ваш код подтверждения:
          </h3>
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #f59e0b',
            borderRadius: '8px',
            padding: '15px',
            margin: '15px 0',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#92400e',
            letterSpacing: '4px',
            fontFamily: 'monospace'
          }}>
            {code}
          </div>
          <p style={{ 
            margin: '0', 
            color: '#92400e',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            Введите этот код в форме подтверждения на сайте
          </p>
        </div>

        <div style={{
          backgroundColor: '#dbeafe',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            color: '#1e40af', 
            margin: '0 0 15px 0', 
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Быстрое подтверждение:
          </h3>
          <p style={{ 
            margin: '0 0 15px 0', 
            color: '#1e40af',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            Или нажмите на кнопку ниже для автоматического подтверждения
          </p>
          <a 
            href={verifyUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#f97316',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Подтвердить email
          </a>
        </div>

        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px'
        }}>
          <h3 style={{ 
            color: '#dc2626', 
            margin: '0 0 10px 0', 
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Важно:
          </h3>
          <ul style={{ 
            margin: '0', 
            paddingLeft: '20px', 
            color: '#dc2626',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <li>Код действителен в течение 10 минут</li>
            <li>Если вы не регистрировались, просто проигнорируйте это письмо</li>
            <li>Не передавайте код третьим лицам</li>
          </ul>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '20px 0',
          borderTop: '1px solid #e2e8f0',
          marginTop: '30px'
        }}>
          <p style={{ 
            color: '#64748b', 
            margin: '0', 
            fontSize: '14px'
          }}>
            После подтверждения вы сможете заказывать вкусную пиццу!
          </p>
          <p style={{ 
            color: '#1e293b', 
            margin: '15px 0 0 0', 
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            С уважением, команда Pizza Hub
          </p>
        </div>
      </div>
    </div>
  );
};
