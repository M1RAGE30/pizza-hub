"use client";

import React from "react";
import {
  WhiteBlock,
  FormTextarea,
  AddressInput,
  ErrorText,
  ClearButton,
} from "../../";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control, watch, setValue } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => {
            const onClickClear = () => {
              field.onChange("");
            };

            return (
              <div>
                <div className="relative">
                  <AddressInput value={field.value} onChange={field.onChange} />
                  {field.value && <ClearButton onClick={onClickClear} />}
                </div>
                {fieldState.error?.message && (
                  <ErrorText text={fieldState.error.message} className="mt-2" />
                )}
              </div>
            );
          }}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
