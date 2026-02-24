import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Property, Tenant, Payment, Expense } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../constants/currencies';

export default function PropertyDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { t, currency } = useApp();
  const [property, setProperty] = useState<Property | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    const properties = await storage.getProperties();
    const found = properties.find(p => p.id === id);
    if (found) {
      setProperty(found);
      
      const tenants = await storage.getTenants();
      const currentTenant = tenants.find(t => t.propertyId === id);
      setTenant(currentTenant || null);

      const allPayments = await storage.getPayments();
      const propertyPayments = allPayments.filter(p => p.propertyId === id);
      setPayments(propertyPayments);

      const allExpenses = await storage.getExpenses();
      const propertyExpenses = allExpenses.filter(e => e.propertyId === id);
      setExpenses(propertyExpenses);
    }
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

        {/* Locataire actuel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.tenant.title}</Text>
          {tenant ? (
            <TouchableOpacity 
              style={styles.tenantCard}
              onPress={() => router.push(`/tenant/${tenant.id}`)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {tenant.firstName[0]}{tenant.lastName[0]}
                </Text>
              </View>
              <View style={styles.tenantInfo}>
                <Text style={styles.tenantName}>
                  {tenant.firstName} {tenant.lastName}
                </Text>
                <View style={styles.contactRow}>
                  <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.contactText}>{tenant.phone}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.contactText}>
                    Depuis {new Date(tenant.moveInDate).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.emptyCard}
              onPress={() => router.push('/tenant/add')}
            >
              <Ionicons name="person-add-outline" size={32} color={colors.textSecondary} />
              <Text style={styles.emptyText}>Aucun locataire</Text>
              <Text style={styles.emptySubtext}>Ajouter un locataire</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Historique des paiements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Paiements récents</Text>
            <TouchableOpacity onPress={() => router.push('/payment/add')}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {payments.length > 0 ? (
            <>
              {payments.slice(0, 5).map((payment) => (
                <View key={payment.id} style={styles.paymentCard}>
                  <View style={styles.paymentLeft}>
                    <Text style={styles.paymentAmount}>
                      {formatCurrency(payment.amount, payment.currency || currency)}
                    </Text>
                    <Text style={styles.paymentDate}>
                      {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, styles[`status${payment.status}`]]}>
                    <Text style={styles.statusText}>
                      {payment.status === 'paid' && 'Payé'}
                      {payment.status === 'pending' && 'En attente'}
                      {payment.status === 'late' && 'En retard'}
                      {payment.status === 'partial' && 'Partiel'}
                    </Text>
                  </View>
                </View>
              ))}
              {payments.length > 5 && (
                <Text style={styles.moreText}>+{payments.length - 5} autres paiements</Text>
              )}
            </>
          ) : (
            <View style={styles.emptyCard}>
              <Ionicons name="cash-outline" size={32} color={colors.textSecondary} />
              <Text style={styles.emptyText}>Aucun paiement</Text>
            </View>
          )}
        </View>

        {/* Dépenses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dépenses récentes</Text>
            <TouchableOpacity onPress={() => router.push('/expense/add')}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {expenses.length > 0 ? (
            <>
              {expenses.slice(0, 5).map((expense) => (
                <View key={expense.id} style={styles.expenseCard}>
                  <View style={styles.expenseLeft}>
                    <Text style={styles.expenseDescription}>{expense.description}</Text>
                    <Text style={styles.expenseDate}>
                      {new Date(expense.date).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <Text style={styles.expenseAmount}>
                    -{formatCurrency(expense.amount, expense.currency || currency)}
                  </Text>
                </View>
              ))}
              {expenses.length > 5 && (
                <Text style={styles.moreText}>+{expenses.length - 5} autres dépenses</Text>
              )}
            </>
          ) : (
            <View style={styles.emptyCard}>
              <Ionicons name="receipt-outline" size={32} color={colors.textSecondary} />
              <Text style={styles.emptyText}>Aucune dépense</Text>
            </View>
          )}
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
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tenantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#fff',
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  contactText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  emptyCard: {
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentLeft: {
    flex: 1,
  },
  paymentAmount: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  paymentDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statuspaid: {
    backgroundColor: colors.success + '20',
  },
  statuspending: {
    backgroundColor: colors.warning + '20',
  },
  statuslate: {
    backgroundColor: colors.error + '20',
  },
  statuspartial: {
    backgroundColor: colors.info + '20',
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  expenseLeft: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  expenseDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  expenseAmount: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.error,
  },
  moreText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});
