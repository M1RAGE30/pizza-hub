"use client";

import { ClearButton, ErrorText, RequiredSymbol } from "../";
import { useFormContext } from "react-hook-form";
import React from "react";
import { IMaskInput } from "react-imask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormPhoneInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  const handleAccept = (value: string, mask: any) => {
    const unmaskedValue = mask.unmaskedValue;
    if (unmaskedValue.length === 9) {
      setValue(name, value, { shouldValidate: true });
    } else if (unmaskedValue.length === 0) {
      setValue(name, "", { shouldValidate: true });
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <IMaskInput
          mask="+375 (00) 000-00-00"
          value={value || ""}
          onAccept={handleAccept}
          placeholder={props.placeholder}
          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {value && !props.disabled && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
