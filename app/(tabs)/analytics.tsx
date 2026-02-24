import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Property, Payment, Expense } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../constants/currencies';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const { t, currency } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [propertiesData, paymentsData, expensesData] = await Promise.all([
      storage.getProperties(),
      storage.getPayments(),
      storage.getExpenses(),
    ]);
    setProperties(propertiesData);
    setPayments(paymentsData);
    setExpenses(expensesData);
    setLoading(false);
  };

  // Calculs globaux
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  // Revenus par mois (12 derniers mois)
  const getMonthlyData = () => {
    const monthlyRevenue: { [key: string]: number } = {};
    const monthlyExpenses: { [key: string]: number } = {};
    
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyRevenue[key] = 0;
      monthlyExpenses[key] = 0;
    }

    payments
      .filter(p => p.status === 'paid' && p.paidDate)
      .forEach(p => {
        const date = new Date(p.paidDate!);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (monthlyRevenue[key] !== undefined) {
          monthlyRevenue[key] += p.amount;
        }
      });

    expenses.forEach(e => {
      const date = new Date(e.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyExpenses[key] !== undefined) {
        monthlyExpenses[key] += e.amount;
      }
    });

    return { monthlyRevenue, monthlyExpenses };
  };

  const { monthlyRevenue, monthlyExpenses } = getMonthlyData();

  // Rentabilité par bien
  const getPropertyProfitability = () => {
    return properties.map(property => {
      const propertyPayments = payments.filter(
        p => p.propertyId === property.id && p.status === 'paid'
      );
      const propertyExpenses = expenses.filter(e => e.propertyId === property.id);
      
      const revenue = propertyPayments.reduce((sum, p) => sum + p.amount, 0);
      const expense = propertyExpenses.reduce((sum, e) => sum + e.amount, 0);
      const profit = revenue - expense;
      const roi = revenue > 0 ? (profit / revenue) * 100 : 0;

      return {
        property,
        revenue,
        expense,
        profit,
        roi,
      };
    }).sort((a, b) => b.profit - a.profit);
  };

  const propertyStats = getPropertyProfitability();

  // Dépenses par catégorie
  const getExpensesByCategory = () => {
    const categories: { [key: string]: number } = {
      repair: 0,
      maintenance: 0,
      tax: 0,
      insurance: 0,
      utilities: 0,
      other: 0,
    };

    expenses.forEach(e => {
      categories[e.category] += e.amount;
    });

    return Object.entries(categories)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const expensesByCategory = getExpensesByCategory();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>{t.common.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const maxMonthlyRevenue = Math.max(...Object.values(monthlyRevenue), 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Vue d'ensemble */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
          
          <View style={styles.overviewGrid}>
            <View style={[styles.overviewCard, { backgroundColor: colors.success + '15' }]}>
              <Ionicons name="trending-up" size={32} color={colors.success} />
              <Text style={styles.overviewValue}>{formatCurrency(totalRevenue, currency)}</Text>
              <Text style={styles.overviewLabel}>Revenus totaux</Text>
            </View>

            <View style={[styles.overviewCard, { backgroundColor: colors.error + '15' }]}>
              <Ionicons name="trending-down" size={32} color={colors.error} />
              <Text style={styles.overviewValue}>{formatCurrency(totalExpenses, currency)}</Text>
              <Text style={styles.overviewLabel}>Dépenses totales</Text>
            </View>

            <View style={[styles.overviewCard, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="cash" size={32} color={colors.primary} />
              <Text style={[styles.overviewValue, { color: netProfit >= 0 ? colors.success : colors.error }]}>
                {formatCurrency(netProfit, currency)}
              </Text>
              <Text style={styles.overviewLabel}>Bénéfice net</Text>
            </View>

            <View style={[styles.overviewCard, { backgroundColor: colors.info + '15' }]}>
              <Ionicons name="stats-chart" size={32} color={colors.info} />
              <Text style={[styles.overviewValue, { color: profitMargin >= 0 ? colors.success : colors.error }]}>
                {profitMargin.toFixed(1)}%
              </Text>
              <Text style={styles.overviewLabel}>Marge bénéficiaire</Text>
            </View>
          </View>
        </View>

        {/* Graphique des revenus mensuels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenus vs Dépenses (12 mois)</Text>
          
          <View style={styles.chartContainer}>
            {Object.entries(monthlyRevenue).map(([month, revenue]) => {
              const expense = monthlyExpenses[month];
              const revenueHeight = (revenue / maxMonthlyRevenue) * 150;
              const expenseHeight = (expense / maxMonthlyRevenue) * 150;
              const monthLabel = new Date(month + '-01').toLocaleDateString('fr-FR', { month: 'short' });

              return (
                <View key={month} style={styles.chartBar}>
                  <View style={styles.barContainer}>
                    <View style={[styles.bar, styles.revenueBar, { height: revenueHeight }]} />
                    <View style={[styles.bar, styles.expenseBar, { height: expenseHeight }]} />
                  </View>
                  <Text style={styles.chartLabel}>{monthLabel}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
              <Text style={styles.legendText}>Revenus</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
              <Text style={styles.legendText}>Dépenses</Text>
            </View>
          </View>
        </View>

        {/* Rentabilité par bien */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rentabilité par bien</Text>
          
          {propertyStats.map(({ property, revenue, expense, profit, roi }) => (
            <View key={property.id} style={styles.propertyCard}>
              <View style={styles.propertyHeader}>
                <Text style={styles.propertyName}>{property.name}</Text>
                <View style={[styles.roiBadge, { backgroundColor: roi >= 0 ? colors.success + '20' : colors.error + '20' }]}>
                  <Text style={[styles.roiText, { color: roi >= 0 ? colors.success : colors.error }]}>
                    ROI: {roi.toFixed(1)}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.propertyStats}>
                <View style={styles.propertyStat}>
                  <Text style={styles.propertyStatLabel}>Revenus</Text>
                  <Text style={[styles.propertyStatValue, { color: colors.success }]}>
                    {formatCurrency(revenue, property.currency || currency)}
                  </Text>
                </View>
                <View style={styles.propertyStat}>
                  <Text style={styles.propertyStatLabel}>Dépenses</Text>
                  <Text style={[styles.propertyStatValue, { color: colors.error }]}>
                    {formatCurrency(expense, property.currency || currency)}
                  </Text>
                </View>
                <View style={styles.propertyStat}>
                  <Text style={styles.propertyStatLabel}>Bénéfice</Text>
                  <Text style={[styles.propertyStatValue, { color: profit >= 0 ? colors.success : colors.error }]}>
                    {formatCurrency(profit, property.currency || currency)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Dépenses par catégorie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dépenses par catégorie</Text>
          
          {expensesByCategory.map(({ category, amount }) => {
            const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
            const categoryLabels: { [key: string]: string } = {
              repair: 'Réparations',
              maintenance: 'Entretien',
              tax: 'Taxes',
              insurance: 'Assurance',
              utilities: 'Charges',
              other: 'Autres',
            };

            return (
              <View key={category} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{categoryLabels[category]}</Text>
                  <Text style={styles.categoryAmount}>{formatCurrency(amount, currency)}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${percentage}%` }]} />
                </View>
                <Text style={styles.categoryPercentage}>{percentage.toFixed(1)}%</Text>
              </View>
            );
          })}
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
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
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  overviewCard: {
    flex: 1,
    minWidth: '47%',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.sm,
  },
  overviewLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingHorizontal: spacing.xs,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: spacing.xs,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    minHeight: 2,
  },
  revenueBar: {
    backgroundColor: colors.success,
  },
  expenseBar: {
    backgroundColor: colors.error,
  },
  chartLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  propertyCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  propertyName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  roiBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  roiText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  propertyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyStat: {
    flex: 1,
    alignItems: 'center',
  },
  propertyStatLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  propertyStatValue: {
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  categoryCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  categoryAmount: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.error,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.error,
  },
  categoryPercentage: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'right',
  },
});
