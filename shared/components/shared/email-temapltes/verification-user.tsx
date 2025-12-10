import React from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }): React.ReactElement => {
  const baseUrl = "http://localhost:3000";
  const verifyUrl = `${baseUrl}/api/auth/verify?code=${code}`;

  return (
    <div>
      <h1>Подтверждение регистрации</h1>

      <p>
        Спасибо за регистрацию! Для завершения регистрации введите код
        подтверждения: <b>{code}</b>
      </p>

      <p>
        Или перейдите <a href={verifyUrl}>по этой ссылке</a> для автоматического
        подтверждения.
      </p>
    </div>
  );
};
