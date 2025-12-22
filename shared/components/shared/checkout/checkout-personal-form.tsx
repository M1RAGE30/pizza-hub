import React from "react";
import { WhiteBlock, FormInput } from "../";
import { FormPhoneInput } from "../form/form-phone-input";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormPhoneInput name="phone" className="text-base" placeholder="+375 (XX) XXX-XX-XX" />
      </div>
    </WhiteBlock>
  );
};
