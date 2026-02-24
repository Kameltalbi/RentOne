import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../i18n/translations';
import { CURRENCIES } from '../constants/currencies';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('fr');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('language', selectedLanguage);
      await AsyncStorage.setItem('currency', selectedCurrency);
      await AsyncStorage.setItem('onboarding_completed', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const renderWelcome = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="home" size={80} color={colors.primary} />
      </View>
      <Text style={styles.title}>Bienvenue sur RentOne</Text>
      <Text style={styles.subtitle}>
        Gérez vos biens immobiliers en toute simplicité
      </Text>
      <View style={styles.featureList}>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={styles.featureText}>Suivi des loyers</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={styles.featureText}>Gestion des dépenses</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={styles.featureText}>Rappels intelligents</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={styles.featureText}>Multi-langues & devises</Text>
        </View>
      </View>
    </View>
  );

  const renderLanguageSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Choisissez votre langue</Text>
      <Text style={styles.subtitle}>Select your language</Text>
      <View style={styles.optionsList}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[styles.option, selectedLanguage === lang.code && styles.optionActive]}
            onPress={() => setSelectedLanguage(lang.code)}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.optionText, selectedLanguage === lang.code && styles.optionTextActive]}>
                {lang.name}
              </Text>
            </View>
            {selectedLanguage === lang.code && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCurrencySelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Choisissez votre devise</Text>
      <Text style={styles.subtitle}>Choose your currency</Text>
      <ScrollView style={styles.currencyScroll} showsVerticalScrollIndicator={false}>
        {CURRENCIES.slice(0, 12).map((curr) => (
          <TouchableOpacity
            key={curr.code}
            style={[styles.option, selectedCurrency === curr.code && styles.optionActive]}
            onPress={() => setSelectedCurrency(curr.code)}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.currencySymbol}>{curr.symbol}</Text>
              <View>
                <Text style={[styles.optionText, selectedCurrency === curr.code && styles.optionTextActive]}>
                  {curr.name} ({curr.code})
                </Text>
                <Text style={styles.countries}>{curr.countries.slice(0, 2).join(', ')}</Text>
              </View>
            </View>
            {selectedCurrency === curr.code && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const steps = [renderWelcome, renderLanguageSelection, renderCurrencySelection];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[styles.progressDot, index <= step && styles.progressDotActive]}
            />
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {steps[step]()}
      </ScrollView>

      <View style={styles.footer}>
        {step > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={() => setStep(step - 1)}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextButton, step === 0 && styles.nextButtonFull]}
          onPress={() => {
            if (step < steps.length - 1) {
              setStep(step + 1);
            } else {
              handleComplete();
            }
          }}
        >
          <Text style={styles.nextButtonText}>
            {step === steps.length - 1 ? 'Commencer' : 'Suivant'}
          </Text>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  progressDot: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  stepContainer: {
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  featureList: {
    gap: spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  featureText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  optionsList: {
    gap: spacing.sm,
  },
  currencyScroll: {
    maxHeight: 400,
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
    backgroundColor: colors.primaryLight,
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
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  backButtonText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonText: {
    fontSize: fontSize.md,
    color: '#fff',
    fontWeight: '700',
  },
});
