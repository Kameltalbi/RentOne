import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Tenant, Property } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';

export default function AddTenantScreen() {
  const router = useRouter();
  const { t, currency } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [deposit, setDeposit] = useState('');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const props = await storage.getProperties();
    setProperties(props);
    if (props.length > 0) setSelectedPropertyId(props[0].id);
  };

  const handleSave = async () => {
    if (!selectedPropertyId || !firstName || !lastName || !phone || !moveInDate) {
      Alert.alert(t.common.error, 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newTenant: Tenant = {
      id: Date.now().toString(),
      propertyId: selectedPropertyId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      moveInDate,
      deposit: deposit ? parseFloat(deposit) : 0,
      documents: [],
      createdAt: new Date().toISOString(),
    };

    const tenants = await storage.getTenants();
    await storage.saveTenants([...tenants, newTenant]);
    
    router.back();
  };

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
          <Text style={styles.label}>{t.tenant.firstName} *</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Ex: Ahmed"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.tenant.lastName} *</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Ex: Benali"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.tenant.email}</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ex: ahmed@example.com"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.tenant.phone} *</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Ex: +212 6 12 34 56 78"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t.tenant.moveInDate} *</Text>
          <TextInput
            style={styles.input}
            value={moveInDate}
            onChangeText={setMoveInDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Caution ({currency})</Text>
          <TextInput
            style={styles.input}
            value={deposit}
            onChangeText={setDeposit}
            placeholder="Ex: 1500"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
          />
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
