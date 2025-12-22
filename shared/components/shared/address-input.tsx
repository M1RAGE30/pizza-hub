"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ value, onChange }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const suggestionsRef = React.useRef<AddressSuggestions>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMounted && suggestionsRef.current) {
      suggestionsRef.current.setInputValue(value || "");
    }
  }, [value, isMounted]);

  if (!isMounted) {
    return (
      <input
        type="text"
        placeholder="Введите адрес в Беларуси..."
        value={value || ""}
        className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled
      />
    );
  }

  return (
    <AddressSuggestions
      ref={suggestionsRef}
      token="c5e5a2eaeb52209c9c63c591e67f655781e1062b"
      defaultQuery={value}
      onChange={(data) => onChange?.(data?.value)}
      filterLocations={[{ country: "Беларусь" }]}
      inputProps={{
        placeholder: "Введите адрес...",
        className:
          "h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      }}
      containerClassName="w-full"
      suggestionsClassName="mt-1 rounded-lg border border-input bg-white shadow-lg max-h-[300px] overflow-auto"
      suggestionClassName="px-5 py-3 cursor-pointer transition-colors hover:bg-secondary"
      currentSuggestionClassName="bg-secondary"
    />
  );
};
