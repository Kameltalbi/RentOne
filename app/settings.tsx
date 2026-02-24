import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../contexts/AppContext';
import { Language } from '../i18n/translations';
import { CURRENCIES } from '../constants/currencies';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { language, setLanguage, currency, setCurrency, t } = useApp();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.settings.title}</Text>
        <View style={{ width: 40 }} />
      </View>

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
          {CURRENCIES.map((curr) => (
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
  closeButton: {
    padding: spacing.xs,
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
});
