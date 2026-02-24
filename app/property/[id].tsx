import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Property } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../constants/currencies';

export default function PropertyDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { t, currency } = useApp();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    const properties = await storage.getProperties();
    const found = properties.find(p => p.id === id);
    if (found) setProperty(found);
  };

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>{t.common.loading}</Text>
      </SafeAreaView>
    );
  }

  const propertyCurrency = property.currency || currency;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.property.propertyDetails}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {property.photos && property.photos.length > 0 ? (
          <Image source={{ uri: property.photos[0] }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="home" size={80} color={colors.textSecondary} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.name}>{property.name}</Text>
          <View style={styles.row}>
            <Ionicons name="location" size={20} color={colors.textSecondary} />
            <Text style={styles.address}>{property.address}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Ionicons name="resize" size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>{t.property.surface}</Text>
            <Text style={styles.infoValue}>{property.surface} m²</Text>
          </View>

          {property.monthlyRent && (
            <View style={styles.infoCard}>
              <Ionicons name="cash" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>{t.property.monthlyRent}</Text>
              <Text style={styles.infoValue}>
                {formatCurrency(property.monthlyRent, propertyCurrency)}
              </Text>
            </View>
          )}

          <View style={styles.infoCard}>
            <Ionicons name="business" size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>{t.property.type}</Text>
            <Text style={styles.infoValue}>
              {property.type === 'apartment' && t.property.apartment}
              {property.type === 'house' && t.property.house}
              {property.type === 'studio' && t.property.studio}
              {property.type === 'other' && t.property.other}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>{t.tenant.title}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Documents</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  editButton: {
    padding: spacing.xs,
  },
  loading: {
    textAlign: 'center',
    marginTop: spacing.xl,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: colors.border,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: spacing.md,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  address: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    flex: 1,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  infoCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  actionButtonText: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.md,
  },
});
