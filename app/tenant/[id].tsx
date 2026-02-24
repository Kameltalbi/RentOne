import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Tenant, Property, Payment } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../constants/currencies';

export default function TenantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { t, currency } = useApp();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    loadTenant();
  }, [id]);

  const loadTenant = async () => {
    const tenants = await storage.getTenants();
    const found = tenants.find(t => t.id === id);
    if (found) {
      setTenant(found);
      
      const properties = await storage.getProperties();
      const prop = properties.find(p => p.id === found.propertyId);
      setProperty(prop || null);

      const allPayments = await storage.getPayments();
      const tenantPayments = allPayments.filter(p => p.propertyId === found.propertyId);
      setPayments(tenantPayments);
    }
  };

  const handleCall = () => {
    if (tenant?.phone) {
      Linking.openURL(`tel:${tenant.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (tenant?.phone) {
      const phoneNumber = tenant.phone.replace(/[^0-9]/g, '');
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    }
  };

  const handleEmail = () => {
    if (tenant?.email) {
      Linking.openURL(`mailto:${tenant.email}`);
    }
  };

  if (!tenant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>{t.common.loading}</Text>
      </SafeAreaView>
    );
  }

  const paidPayments = payments.filter(p => p.status === 'paid');
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.tenant.title}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {tenant.firstName[0]}{tenant.lastName[0]}
            </Text>
          </View>
          <Text style={styles.name}>{tenant.firstName} {tenant.lastName}</Text>
          {property && (
            <Text style={styles.propertyName}>{property.name}</Text>
          )}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Ionicons name="call" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Appeler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <Text style={styles.actionButtonText}>WhatsApp</Text>
          </TouchableOpacity>

          {tenant.email && (
            <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
              <Ionicons name="mail" size={24} color={colors.primary} />
              <Text style={styles.actionButtonText}>Email</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.infoLabel}>Téléphone</Text>
            <Text style={styles.infoValue}>{tenant.phone}</Text>
          </View>

          {tenant.email && (
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{tenant.email}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.infoLabel}>Date d'entrée</Text>
            <Text style={styles.infoValue}>{new Date(tenant.moveInDate).toLocaleDateString('fr-FR')}</Text>
          </View>

          {tenant.deposit > 0 && (
            <View style={styles.infoRow}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Caution</Text>
              <Text style={styles.infoValue}>{formatCurrency(tenant.deposit, currency)}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des paiements</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{paidPayments.length}</Text>
              <Text style={styles.statLabel}>Paiements</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{formatCurrency(totalPaid, property?.currency || currency)}</Text>
              <Text style={styles.statLabel}>Total payé</Text>
            </View>
          </View>

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
  profileSection: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.card,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  propertyName: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.card,
    marginTop: spacing.sm,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    color: colors.text,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  section: {
    padding: spacing.md,
    backgroundColor: colors.card,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  infoLabel: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
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
});
