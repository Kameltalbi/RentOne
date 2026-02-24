import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Expense, Property } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';

export default function AddExpenseScreen() {
  const router = useRouter();
  const { t, currency } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [category, setCategory] = useState<Expense['category']>('maintenance');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isRecoverable, setIsRecoverable] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const props = await storage.getProperties();
    setProperties(props);
    if (props.length > 0) setSelectedPropertyId(props[0].id);
  };

  const handleSave = async () => {
    if (!selectedPropertyId || !description || !amount || !date) {
      Alert.alert(t.common.error, 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      propertyId: selectedPropertyId,
      category,
      description: description.trim(),
      amount: parseFloat(amount),
      currency,
      date,
      isRecoverable,
      documents: [],
      createdAt: new Date().toISOString(),
    };

    const expenses = await storage.getExpenses();
    await storage.saveExpenses([...expenses, newExpense]);
    
    router.back();
  };

  const categories: { value: Expense['category']; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { value: 'repair', label: t.expense.repair, icon: 'construct' },
    { value: 'maintenance', label: t.expense.maintenance, icon: 'hammer' },
    { value: 'tax', label: t.expense.tax, icon: 'receipt' },
    { value: 'insurance', label: t.expense.insurance, icon: 'shield-checkmark' },
    { value: 'utilities', label: t.expense.utilities, icon: 'water' },
    { value: 'other', label: 'Autre', icon: 'ellipsis-horizontal' },
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
          <Text style={styles.label}>{t.expense.category} *</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[styles.categoryButton, category === cat.value && styles.categoryButtonActive]}
                onPress={() => setCategory(cat.value)}
              >
                <Ionicons 
                  name={cat.icon} 
                  size={24} 
                  color={category === cat.value ? '#fff' : colors.textSecondary} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  category === cat.value && styles.categoryButtonTextActive,
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.expense.description} *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Ex: Réparation chauffe-eau"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.section, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={styles.label}>{t.expense.amount} ({currency}) *</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Ex: 250"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.section, { flex: 1, marginLeft: spacing.sm }]}>
            <Text style={styles.label}>{t.expense.date} *</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.checkboxRow}
            onPress={() => setIsRecoverable(!isRecoverable)}
          >
            <View style={[styles.checkbox, isRecoverable && styles.checkboxActive]}>
              {isRecoverable && (
                <Ionicons name="checkmark" size={20} color="#fff" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{t.expense.recoverable}</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>
            Cochez si cette dépense peut être récupérée auprès du locataire
          </Text>
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
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
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
    backgroundColor: colors.primaryLight,
  },
  propertyButtonText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  propertyButtonTextActive: {
    color: colors.primary,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
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
