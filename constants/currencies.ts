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
  // Afrique francophone
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', countries: ['Senegal', 'Ivory Coast', 'Benin', 'Burkina Faso', 'Mali', 'Niger', 'Togo', 'Guinea-Bissau'] },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', countries: ['Cameroon', 'Chad', 'Congo', 'Gabon', 'Equatorial Guinea', 'Central African Republic'] },
  // Autres devises importantes
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', countries: ['Nigeria'] },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', countries: ['Kenya'] },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', countries: ['Ghana'] },
  { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar', countries: ['Libya'] },
  { code: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya', countries: ['Mauritania'] },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', countries: ['Qatar'] },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', countries: ['Kuwait'] },
  { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar', countries: ['Bahrain'] },
  { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial', countries: ['Oman'] },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar', countries: ['Jordan'] },
  { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound', countries: ['Lebanon'] },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', countries: ['Israel'] },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', countries: ['Pakistan'] },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', countries: ['Bangladesh'] },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', countries: ['Indonesia'] },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', countries: ['Malaysia'] },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', countries: ['Thailand'] },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', countries: ['Vietnam'] },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', countries: ['Philippines'] },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', countries: ['Singapore'] },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', countries: ['Hong Kong'] },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', countries: ['South Korea'] },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', countries: ['Russia'] },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', countries: ['Poland'] },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', countries: ['Czech Republic'] },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', countries: ['Hungary'] },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', countries: ['Romania'] },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', countries: ['Sweden'] },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', countries: ['Norway'] },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', countries: ['Denmark'] },
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
