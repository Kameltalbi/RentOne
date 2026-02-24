import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Property } from '../../types';
import { storage } from '../../utils/storage';
import { PropertyCard } from '../../components/PropertyCard';
import { colors, spacing, fontSize } from '../../constants/theme';
import { useSubscription } from '../../contexts/SubscriptionContext';

export default function PropertiesScreen() {
  const router = useRouter();
  const { canAddProperty, isPremium } = useSubscription();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const data = await storage.getProperties();
    setProperties(data);
    setLoading(false);
  };

  const handleAddProperty = () => {
    if (!canAddProperty(properties.length)) {
      Alert.alert(
        'Limite atteinte',
        'Vous avez atteint la limite de 1 bien en version gratuite. Passez à Premium pour ajouter des biens illimités !',
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Voir Premium', 
            onPress: () => router.push('/premium'),
            style: 'default'
          },
        ]
      );
      return;
    }
    router.push('/property/add');
  };

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (properties.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Ionicons name="home-outline" size={80} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>Aucun bien</Text>
          <Text style={styles.emptyText}>Ajoutez votre premier bien immobilier</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddProperty}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Ajouter un bien</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity style={styles.fab} onPress={handleAddProperty}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  listContent: {
    padding: spacing.md,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
