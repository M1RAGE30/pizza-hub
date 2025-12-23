export const convertBYNToRUB = (bynAmount: number): number => {
  const exchangeRate = 30;
  return bynAmount * exchangeRate;
};
