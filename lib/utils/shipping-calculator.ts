// lib/utils/shipping-calculator.ts

export interface ShippingRate {
  label: string;
  price: number;
  currency: 'TZS' | 'USD';
  estimatedDays: string;
}

export const getShippingRates = (location: 'DSM' | 'UPCOUNTRY' | 'INTL'): ShippingRate[] => {
  switch (location) {
    case 'DSM':
      return [{ label: 'Boda Boda Express', price: 5000, currency: 'TZS', estimatedDays: 'Same Day' }];
    case 'UPCOUNTRY':
      return [{ label: 'Regional Bus/Truck', price: 15000, currency: 'TZS', estimatedDays: '2-3 Days' }];
    case 'INTL':
      return [{ label: 'DHL Express Worldwide', price: 45, currency: 'USD', estimatedDays: '5-7 Days' }];
    default:
      return [];
  }
}

