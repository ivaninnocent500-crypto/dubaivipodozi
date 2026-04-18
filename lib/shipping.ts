// lib/shipping.ts
export const calculateShipping = (zone: 'local' | 'international', cartItems: any[]) => {
  if (zone === 'local') {
    // Fixed rate for Tanzania
    return 7.00; // USD equivalent of ~7,000 TZS
  }

  // International: Weight-based (assuming average 250g per item)
  const totalWeight = cartItems.reduce((acc, item) => acc + (item.quantity * 250), 0);
  
  if (totalWeight <= 500) return 35; // $35 USD min for DHL
  if (totalWeight <= 2000) return 60;
  return 100; // Heavy bulk shipping
};
