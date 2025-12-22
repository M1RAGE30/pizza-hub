export const formatPrice = (price: number): string => {
  if (price % 1 === 0) {
    return price.toString();
  }
  
  const formatted = price.toFixed(2);
  
  if (formatted.endsWith('0')) {
    return formatted.slice(0, -1);
  }
  
  return formatted;
};