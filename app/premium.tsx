import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useApp } from '../contexts/AppContext';

export default function PremiumScreen() {
  const router = useRouter();
  const { setPremium } = useSubscription();
  const { t } = useApp();

  const features = [
    { icon: 'infinite', title: 'Biens illimités', description: 'Ajoutez autant de biens que vous voulez' },
    { icon: 'cloud-upload', title: 'Sauvegarde cloud', description: 'Vos données synchronisées et sécurisées' },
    { icon: 'notifications', title: 'Notifications avancées', description: 'Rappels personnalisés et alertes' },
    { icon: 'document-text', title: 'Documents illimités', description: 'Stockez tous vos contrats et factures' },
    { icon: 'bar-chart', title: 'Analytics premium', description: 'Rapports détaillés et prédictions IA' },
    { icon: 'download', title: 'Export Excel/PDF', description: 'Exportez vos données en un clic' },
    { icon: 'shield-checkmark', title: 'Support prioritaire', description: 'Assistance rapide et dédiée' },
    { icon: 'color-wand', title: 'Thèmes personnalisés', description: 'Dark mode et couleurs au choix' },
  ];

  const handleUpgrade = async () => {
    // TODO: Intégrer vraie logique de paiement (Stripe, etc.)
    await setPremium(true);
    router.back();
  };

  const handleRestore = () => {
    // TODO: Restaurer achats
    console.log('Restore purchases');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.iconContainer}>
            <Ionicons name="rocket" size={64} color={colors.primary} />
          </View>
          <Text style={styles.title}>Passez à Premium</Text>
          <Text style={styles.subtitle}>
            Débloquez toutes les fonctionnalités et gérez vos biens sans limites
          </Text>
        </View>

        <View style={styles.pricingCard}>
          <View style={styles.pricingBadge}>
            <Text style={styles.badgeText}>OFFRE DE LANCEMENT</Text>
          </View>
          <Text style={styles.price}>4,99€</Text>
          <Text style={styles.priceSubtext}>par mois</Text>
          <Text style={styles.priceAlt}>ou 49€/an (économisez 17%)</Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Tout ce qui est inclus :</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            </View>
          ))}
        </View>

        <View style={styles.comparison}>
          <Text style={styles.comparisonTitle}>Version gratuite vs Premium</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Nombre de biens</Text>
              <Text style={styles.comparisonFree}>1</Text>
              <Text style={styles.comparisonPremium}>Illimité</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Locataires</Text>
              <Text style={styles.comparisonFree}>1</Text>
              <Text style={styles.comparisonPremium}>Illimité</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Documents</Text>
              <Text style={styles.comparisonFree}>5</Text>
              <Text style={styles.comparisonPremium}>Illimité</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Sauvegarde cloud</Text>
              <Text style={styles.comparisonFree}>✗</Text>
              <Text style={styles.comparisonPremium}>✓</Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>Export Excel/PDF</Text>
              <Text style={styles.comparisonFree}>✗</Text>
              <Text style={styles.comparisonPremium}>✓</Text>
            </View>
          </View>
        </View>

        <View style={styles.guarantee}>
          <Ionicons name="shield-checkmark" size={32} color={colors.success} />
          <Text style={styles.guaranteeText}>
            Garantie satisfait ou remboursé 30 jours
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.upgradeButtonText}>Passer à Premium</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRestore}>
          <Text style={styles.restoreText}>Restaurer mes achats</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  closeButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pricingCard: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  pricingBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: '#fff',
  },
  price: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
  },
  priceSubtext: {
    fontSize: fontSize.md,
    color: '#fff',
    opacity: 0.9,
  },
  priceAlt: {
    fontSize: fontSize.sm,
    color: '#fff',
    opacity: 0.8,
    marginTop: spacing.sm,
  },
  featuresSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  featuresTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  comparison: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  comparisonTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  comparisonTable: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  comparisonLabel: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  comparisonFree: {
    width: 60,
    textAlign: 'center',
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  comparisonPremium: {
    width: 60,
    textAlign: 'center',
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  guarantee: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  guaranteeText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  upgradeButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  upgradeButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#fff',
  },
  restoreText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
});
