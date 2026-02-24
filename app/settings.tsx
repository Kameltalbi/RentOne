import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Language } from '../i18n/translations';
import { CURRENCIES } from '../constants/currencies';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { language, setLanguage, currency, setCurrency, t } = useApp();
  const { isPremium } = useSubscription();
  const [searchQuery, setSearchQuery] = useState('');

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.settings.title}</Text>
          <View style={{ width: 24 }} />
        </View>

      {!isPremium && (
        <TouchableOpacity 
          style={styles.premiumBanner}
          onPress={() => router.push('/premium')}
        >
          <View style={styles.premiumIcon}>
            <Ionicons name="rocket" size={24} color="#fff" />
          </View>
          <View style={styles.premiumText}>
            <Text style={styles.premiumTitle}>Passez à Premium</Text>
            <Text style={styles.premiumSubtitle}>Biens illimités et plus encore</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {isPremium && (
        <View style={styles.premiumActiveBanner}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={styles.premiumActiveText}>Compte Premium actif</Text>
        </View>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.language}</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[styles.option, language === lang.code && styles.optionActive]}
              onPress={() => setLanguage(lang.code)}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text style={[styles.optionText, language === lang.code && styles.optionTextActive]}>
                  {lang.name}
                </Text>
              </View>
              {language === lang.code && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.currency}</Text>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une devise..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {CURRENCIES.filter(curr => 
            searchQuery === '' || 
            curr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            curr.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            curr.countries.some(country => country.toLowerCase().includes(searchQuery.toLowerCase()))
          ).map((curr) => (
            <TouchableOpacity
              key={curr.code}
              style={[styles.option, currency === curr.code && styles.optionActive]}
              onPress={() => setCurrency(curr.code)}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.currencySymbol}>{curr.symbol}</Text>
                <View>
                  <Text style={[styles.optionText, currency === curr.code && styles.optionTextActive]}>
                    {curr.name} ({curr.code})
                  </Text>
                  <Text style={styles.countries}>{curr.countries.slice(0, 2).join(', ')}</Text>
                </View>
              </View>
              {currency === curr.code && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
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
    marginLeft: -spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  currencySymbol: {
    fontSize: 24,
    marginRight: spacing.md,
    width: 40,
    textAlign: 'center',
  },
  optionText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  optionTextActive: {
    color: colors.primary,
  },
  countries: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    paddingVertical: spacing.xs,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
  },
  premiumIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: '#fff',
    marginBottom: spacing.xs,
  },
  premiumSubtitle: {
    fontSize: fontSize.sm,
    color: '#fff',
    opacity: 0.9,
  },
  premiumActiveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  premiumActiveText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.success,
  },
});
