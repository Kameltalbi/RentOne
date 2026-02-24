export const colors = {
  // Primary colors - Blue theme
  primary: '#2563EB',        // Bleu moyen
  primaryDark: '#1E3A8A',    // Bleu profond
  primaryLight: '#DBEAFE',   // Bleu clair
  
  // Background colors
  background: '#F9FAFB',     // Gris clair fond
  card: '#FFFFFF',           // Blanc
  
  // Text colors
  text: '#374151',           // Gris texte
  textSecondary: '#6B7280',
  
  // Border
  border: '#E5E7EB',
  
  // Status colors
  success: '#16A34A',        // Succès (payé)
  error: '#DC2626',          // Alerte (retard)
  warning: '#F59E0B',        // En attente
  danger: '#DC2626',         // Alias for error
  info: '#2563EB',           // Info (primary blue)
  
  // Legacy/compatibility
  secondary: '#2563EB',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
