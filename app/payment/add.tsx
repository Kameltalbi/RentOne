import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Payment, Property } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';

export default function AddPaymentScreen() {
  const router = useRouter();
  const { t, currency } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<Payment['status']>('pending');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const props = await storage.getProperties();
    setProperties(props);
    if (props.length > 0) setSelectedPropertyId(props[0].id);
  };

  const handleSave = async () => {
    if (!selectedPropertyId || !amount || !dueDate) {
      Alert.alert(t.common.error, 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newPayment: Payment = {
      id: Date.now().toString(),
      propertyId: selectedPropertyId,
      amount: parseFloat(amount),
      currency,
      dueDate,
      status,
      createdAt: new Date().toISOString(),
    };

    const payments = await storage.getPayments();
    await storage.savePayments([...payments, newPayment]);
    
    router.back();
  };

  const statuses: { value: Payment['status']; label: string; color: string }[] = [
    { value: 'pending', label: t.payment.pending, color: colors.warning },
    { value: 'paid', label: t.payment.paid, color: colors.success },
    { value: 'late', label: t.payment.late, color: colors.error },
    { value: 'partial', label: t.payment.partial, color: colors.info },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>{t.property.title} *</Text>
          <View style={styles.propertyList}>
            {properties.map((prop) => (
              <TouchableOpacity
                key={prop.id}
                style={[styles.propertyButton, selectedPropertyId === prop.id && styles.propertyButtonActive]}
                onPress={() => setSelectedPropertyId(prop.id)}
              >
                <Text style={[styles.propertyButtonText, selectedPropertyId === prop.id && styles.propertyButtonTextActive]}>
                  {prop.name}
                </Text>
                {selectedPropertyId === prop.id && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.payment.amount} *</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Ex: 850"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.payment.dueDate} *</Text>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.payment.status} *</Text>
          <View style={styles.statusContainer}>
            {statuses.map((s) => (
              <TouchableOpacity
                key={s.value}
                style={[styles.statusButton, status === s.value && { backgroundColor: s.color }]}
                onPress={() => setStatus(s.value)}
              >
                <Text style={[styles.statusButtonText, status === s.value && styles.statusButtonTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.bottomSaveButton} onPress={handleSave}>
          <Text style={styles.bottomSaveButtonText}>{t.common.save}</Text>
        </TouchableOpacity>

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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  closeButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  propertyList: {
    gap: spacing.sm,
  },
  propertyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  propertyButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  propertyButtonText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  propertyButtonTextActive: {
    color: colors.primary,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statusButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  statusButtonText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  bottomSaveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  bottomSaveButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#fff',
  },
});
