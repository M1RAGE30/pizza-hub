"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <input
        type="text"
        placeholder="Введите адрес..."
        className="h-12 w-full min-w-0 rounded-lg border border-input bg-transparent px-5 py-4 text-md shadow-xs outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        disabled
      />
    );
  }

  return (
    <AddressSuggestions
      token="c5e5a2eaeb52209c9c63c591e67f655781e1062b"
      onChange={(data) => onChange?.(data?.value)}
      inputProps={{
        placeholder: "Введите адрес...",
        className:
          "h-12 w-full min-w-0 rounded-lg border border-input bg-transparent px-5 py-4 text-md shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      }}
      containerClassName="w-full"
      suggestionsClassName="mt-1 rounded-lg border border-input bg-white shadow-lg max-h-[300px] overflow-auto"
      suggestionClassName="px-5 py-3 cursor-pointer transition-colors hover:bg-secondary"
      currentSuggestionClassName="bg-secondary"
    />
  );
};
