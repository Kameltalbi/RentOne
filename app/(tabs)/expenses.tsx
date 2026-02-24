import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Expense, Property } from '../../types';
import { storage } from '../../utils/storage';
import { financial } from '../../utils/financial';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../constants/theme';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ExpensesScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [expensesData, propertiesData] = await Promise.all([
      storage.getExpenses(),
      storage.getProperties(),
    ]);
    setExpenses(expensesData.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
    setProperties(propertiesData);
    setLoading(false);
  };

  const getPropertyName = (propertyId: string) => {
    return properties.find(p => p.id === propertyId)?.name || 'Bien inconnu';
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const recoverableExpenses = expenses.filter(e => e.isRecoverable).reduce((sum, e) => sum + e.amount, 0);

  const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    repair: 'construct',
    maintenance: 'hammer',
    tax: 'document-text',
    insurance: 'shield-checkmark',
    charges: 'flash',
    other: 'ellipsis-horizontal',
  };

  const categoryLabels: Record<string, string> = {
    repair: 'Réparation',
    maintenance: 'Entretien',
    tax: 'Taxe',
    insurance: 'Assurance',
    charges: 'Charges',
    other: 'Autre',
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total dépenses</Text>
          <Text style={[styles.statValue, { color: colors.danger }]}>
            {financial.formatCurrency(totalExpenses)}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Récupérable</Text>
          <Text style={[styles.statValue, { color: colors.success }]}>
            {financial.formatCurrency(recoverableExpenses)}
          </Text>
        </View>
      </View>

      {expenses.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="receipt-outline" size={80} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>Aucune dépense</Text>
          <Text style={styles.emptyText}>Ajoutez vos dépenses pour suivre vos finances</Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.expenseCard} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={categoryIcons[item.category]} 
                  size={24} 
                  color={colors.primary} 
                />
              </View>
              
              <View style={styles.expenseContent}>
                <View style={styles.expenseHeader}>
                  <Text style={styles.expenseDescription}>{item.description}</Text>
                  <Text style={styles.expenseAmount}>
                    {financial.formatCurrency(item.amount)}
                  </Text>
                </View>
                
                <View style={styles.expenseFooter}>
                  <Text style={styles.expenseProperty}>{getPropertyName(item.propertyId)}</Text>
                  <Text style={styles.expenseDate}>
                    {format(new Date(item.date), 'dd MMM yyyy', { locale: fr })}
                  </Text>
                </View>
                
                <View style={styles.tags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{categoryLabels[item.category]}</Text>
                  </View>
                  {item.isRecoverable && (
                    <View style={[styles.tag, styles.recoverableTag]}>
                      <Text style={styles.recoverableTagText}>Récupérable</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/expense/add')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    padding: spacing.md,
  },
  expenseCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    ...shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  expenseContent: {
    flex: 1,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  expenseDescription: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  expenseAmount: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.danger,
  },
  expenseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  expenseProperty: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  expenseDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  recoverableTag: {
    backgroundColor: colors.success + '20',
  },
  recoverableTagText: {
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
