import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Property } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';

export default function AddPropertyScreen() {
  const router = useRouter();
  const { t, currency } = useApp();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [surface, setSurface] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [type, setType] = useState<Property['type']>('apartment');

  const handleSave = async () => {
    if (!name.trim() || !address.trim() || !surface.trim()) {
      Alert.alert(t.common.error, 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newProperty: Property = {
      id: Date.now().toString(),
      name: name.trim(),
      address: address.trim(),
      surface: parseFloat(surface),
      type,
      monthlyRent: monthlyRent ? parseFloat(monthlyRent) : undefined,
      currency,
      photos: [],
      documents: [],
      createdAt: new Date().toISOString(),
    };

    const properties = await storage.getProperties();
    await storage.saveProperties([...properties, newProperty]);
    
    router.back();
  };

  const propertyTypes: { value: Property['type']; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { value: 'apartment', label: t.property.apartment, icon: 'business' },
    { value: 'house', label: t.property.house, icon: 'home' },
    { value: 'studio', label: t.property.studio, icon: 'bed' },
    { value: 'other', label: t.property.other, icon: 'location' },
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
          <Text style={styles.label}>{t.property.propertyName} *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Appartement Paris 15"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.property.address} *</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Ex: 123 Rue de la Paix, 75015 Paris"
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.property.type} *</Text>
          <View style={styles.typeContainer}>
            {propertyTypes.map((pt) => (
              <TouchableOpacity
                key={pt.value}
                style={[styles.typeButton, type === pt.value && styles.typeButtonActive]}
                onPress={() => setType(pt.value)}
              >
                <Ionicons 
                  name={pt.icon} 
                  size={24} 
                  color={type === pt.value ? '#fff' : colors.textSecondary} 
                />
                <Text style={[
                  styles.typeButtonText,
                  type === pt.value && styles.typeButtonTextActive,
                ]}>
                  {pt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.section, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={styles.label}>{t.property.surface} *</Text>
            <TextInput
              style={styles.input}
              value={surface}
              onChangeText={setSurface}
              placeholder="Ex: 45"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.section, { flex: 1, marginLeft: spacing.sm }]}>
            <Text style={styles.label}>{t.property.monthlyRent}</Text>
            <TextInput
              style={styles.input}
              value={monthlyRent}
              onChangeText={setMonthlyRent}
              placeholder="Ex: 850"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.bottomSaveButton} onPress={handleSave}>
          <Text style={styles.bottomSaveButtonText}>{t.property.saveProperty}</Text>
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
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  typeButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
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
