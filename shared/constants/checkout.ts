export const VAT = 20; 
export const DELIVERY_PRICE = 8; 

export const calculateTotalPrice = (cartAmount: number): number => {
  const vatPrice = (cartAmount * VAT) / 100;
  return cartAmount + DELIVERY_PRICE + vatPrice;
};

export const calculateVatPrice = (cartAmount: number): number => {
  return (cartAmount * VAT) / 100;
};
