import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Property } from '../types';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../contexts/AppContext';
import { formatCurrency } from '../constants/currencies';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
  const { currency } = useApp();
  const typeIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    apartment: 'business',
    house: 'home',
    studio: 'bed',
    other: 'location',
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {property.photos.length > 0 ? (
        <Image source={{ uri: property.photos[0] }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Ionicons name={typeIcons[property.type]} size={48} color={colors.textSecondary} />
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{property.name}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.address} numberOfLines={1}>{property.address}</Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.row}>
            <Ionicons name="resize-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detail}>{property.surface} m²</Text>
          </View>
          {property.monthlyRent && (
            <Text style={styles.rent}>{formatCurrency(property.monthlyRent, property.currency || currency)}/mois</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholderImage: {
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  address: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  detail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  rent: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
  },
});
