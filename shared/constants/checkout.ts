export const VAT = 15;
export const DELIVERY_PRICE = 250;

export const calculateTotalPrice = (cartAmount: number): number => {
  const vatPrice = (cartAmount * VAT) / 100;
  return cartAmount + DELIVERY_PRICE + vatPrice;
};

export const calculateVatPrice = (cartAmount: number): number => {
  return (cartAmount * VAT) / 100;
};
