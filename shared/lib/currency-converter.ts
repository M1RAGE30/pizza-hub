export const convertBYNToRUB = (bynAmount: number): number => {
  const exchangeRate = 30;
  return bynAmount * exchangeRate;
};

export const convertRUBToBYN = (rubAmount: number): number => {
  const exchangeRate = 30;
  return rubAmount / exchangeRate;
};