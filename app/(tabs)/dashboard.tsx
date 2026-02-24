import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Property, Payment, Expense } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../constants/currencies';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { t, currency } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [props, pays, exps] = await Promise.all([
      storage.getProperties(),
      storage.getPayments(),
      storage.getExpenses(),
    ]);
    setProperties(props);
    setPayments(pays);
    setExpenses(exps);
    setLoading(false);
  };

  // Calculs
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.monthlyRent && p.monthlyRent > 0).length;
  const occupancyRate = totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyPayments = payments.filter(p => {
    const date = new Date(p.dueDate);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const paidThisMonth = monthlyPayments.filter(p => p.status === 'paid');
  const latePayments = monthlyPayments.filter(p => p.status === 'late');

  const monthlyRevenue = paidThisMonth.reduce((sum, p) => sum + p.amount, 0);
  const expectedRevenue = monthlyPayments.reduce((sum, p) => sum + p.amount, 0);

  const yearlyPayments = payments.filter(p => {
    const date = new Date(p.dueDate);
    return date.getFullYear() === currentYear && p.status === 'paid';
  });
  const yearlyRevenue = yearlyPayments.reduce((sum, p) => sum + p.amount, 0);

  const monthlyExpenses = expenses.filter(e => {
    const date = new Date(e.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  const monthlyExpenseTotal = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const netMonthly = monthlyRevenue - monthlyExpenseTotal;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>{t.common.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour 👋</Text>
            <Text style={styles.subtitle}>Tableau de bord</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Stats principales */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Ionicons name="home" size={32} color="#fff" />
            <Text style={styles.statValue}>{totalProperties}</Text>
            <Text style={styles.statLabel}>Biens</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.success }]}>
            <Ionicons name="cash" size={32} color="#fff" />
            <Text style={styles.statValue}>{formatCurrency(monthlyRevenue, currency)}</Text>
            <Text style={styles.statLabel}>Revenus du mois</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.warning }]}>
            <Ionicons name="alert-circle" size={32} color="#fff" />
            <Text style={styles.statValue}>{latePayments.length}</Text>
            <Text style={styles.statLabel}>En retard</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.info }]}>
            <Ionicons name="trending-up" size={32} color="#fff" />
            <Text style={styles.statValue}>{occupancyRate.toFixed(0)}%</Text>
            <Text style={styles.statLabel}>Taux d'occupation</Text>
          </View>
        </View>

        {/* Revenus vs Dépenses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ce mois-ci</Text>
          <View style={styles.revenueCard}>
            <View style={styles.revenueRow}>
              <View style={styles.revenueItem}>
                <Text style={styles.revenueLabel}>Revenus</Text>
                <Text style={[styles.revenueValue, { color: colors.success }]}>
                  {formatCurrency(monthlyRevenue, currency)}
                </Text>
              </View>
              <View style={styles.revenueItem}>
                <Text style={styles.revenueLabel}>Dépenses</Text>
                <Text style={[styles.revenueValue, { color: colors.error }]}>
                  {formatCurrency(monthlyExpenseTotal, currency)}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.netRow}>
              <Text style={styles.netLabel}>Net</Text>
              <Text style={[styles.netValue, { color: netMonthly >= 0 ? colors.success : colors.error }]}>
                {formatCurrency(netMonthly, currency)}
              </Text>
            </View>
          </View>
        </View>

        {/* Revenus annuels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cette année</Text>
          <View style={styles.yearCard}>
            <Ionicons name="calendar" size={24} color={colors.primary} />
            <View style={styles.yearInfo}>
              <Text style={styles.yearLabel}>Revenus totaux {currentYear}</Text>
              <Text style={styles.yearValue}>{formatCurrency(yearlyRevenue, currency)}</Text>
            </View>
          </View>
        </View>

        {/* Actions rapides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/property/add')}>
              <Ionicons name="home-outline" size={28} color={colors.primary} />
              <Text style={styles.actionText}>Ajouter un bien</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/payment/add')}>
              <Ionicons name="cash-outline" size={28} color={colors.success} />
              <Text style={styles.actionText}>Enregistrer paiement</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/expense/add')}>
              <Ionicons name="receipt-outline" size={28} color={colors.error} />
              <Text style={styles.actionText}>Ajouter dépense</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/tenant/add')}>
              <Ionicons name="person-add-outline" size={28} color={colors.info} />
              <Text style={styles.actionText}>Ajouter locataire</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.card,
  },
  greeting: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
    gap: spacing.sm,
  },
  statCard: {
    width: (width - spacing.md * 3) / 2,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: '#fff',
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: '#fff',
    opacity: 0.9,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  revenueCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  revenueItem: {
    alignItems: 'center',
  },
  revenueLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  revenueValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  netRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  netLabel: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  netValue: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
  },
  yearCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
  },
  yearInfo: {
    flex: 1,
  },
  yearLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  yearValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionButton: {
    width: (width - spacing.md * 3) / 2,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '600',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
