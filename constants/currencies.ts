export interface Currency {
  code: string;
  symbol: string;
  name: string;
  countries: string[];
}

export const CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro', countries: ['France', 'Germany', 'Spain', 'Italy', 'Belgium', 'Netherlands'] },
  { code: 'USD', symbol: '$', name: 'US Dollar', countries: ['United States', 'Ecuador', 'El Salvador'] },
  { code: 'GBP', symbol: '£', name: 'British Pound', countries: ['United Kingdom'] },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', countries: ['Morocco'] },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', countries: ['Algeria'] },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', countries: ['Tunisia'] },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', countries: ['Egypt'] },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', countries: ['Saudi Arabia'] },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', countries: ['United Arab Emirates'] },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', countries: ['Canada'] },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', countries: ['Switzerland'] },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', countries: ['Japan'] },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', countries: ['China'] },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', countries: ['India'] },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', countries: ['Brazil'] },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', countries: ['Mexico'] },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', countries: ['Argentina'] },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', countries: ['Colombia'] },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', countries: ['Chile'] },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', countries: ['Turkey'] },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', countries: ['South Africa'] },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', countries: ['Australia'] },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', countries: ['New Zealand'] },
];

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return CURRENCIES.find(c => c.code === code);
};

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = getCurrencyByCode(currencyCode);
  if (!currency) return `${amount}`;
  
  const formatted = amount.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return `${formatted} ${currency.symbol}`;
};
