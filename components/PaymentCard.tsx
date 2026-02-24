import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Payment } from '../types';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { financial } from '../utils/financial';

interface PaymentCardProps {
  payment: Payment;
  propertyName: string;
  onPress: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ payment, propertyName, onPress }) => {
  const statusConfig = {
    paid: { color: colors.success, icon: 'checkmark-circle' as const, label: 'Payé' },
    pending: { color: colors.warning, icon: 'time' as const, label: 'En attente' },
    late: { color: colors.danger, icon: 'alert-circle' as const, label: 'En retard' },
    partial: { color: colors.info, icon: 'information-circle' as const, label: 'Partiel' },
  };

  const config = statusConfig[payment.status];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.statusBar, { backgroundColor: config.color }]} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Text style={styles.propertyName}>{propertyName}</Text>
            <Text style={styles.date}>
              {format(new Date(payment.dueDate), 'MMMM yyyy', { locale: fr })}
            </Text>
          </View>
          
          <View style={styles.rightSection}>
            <Text style={styles.amount}>{financial.formatCurrency(payment.amount)}</Text>
            <View style={[styles.statusBadge, { backgroundColor: config.color + '20' }]}>
              <Ionicons name={config.icon} size={14} color={config.color} />
              <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
            </View>
          </View>
        </View>
        
        {payment.paidDate && (
          <Text style={styles.paidDate}>
            Payé le {format(new Date(payment.paidDate), 'dd/MM/yyyy')}
          </Text>
        )}
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
    ...shadows.sm,
  },
  statusBar: {
    height: 4,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  propertyName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  amount: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  paidDate: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
