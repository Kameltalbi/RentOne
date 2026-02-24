import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Tenant, Property } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';

export default function TenantsScreen() {
  const router = useRouter();
  const { t } = useApp();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [tenantsData, propertiesData] = await Promise.all([
      storage.getTenants(),
      storage.getProperties(),
    ]);
    setTenants(tenantsData);
    setProperties(propertiesData);
    setLoading(false);
  };

  const getPropertyName = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.name || 'N/A';
  };

  const filteredTenants = tenants.filter(tenant => {
    const fullName = `${tenant.firstName} ${tenant.lastName}`.toLowerCase();
    const propertyName = getPropertyName(tenant.propertyId).toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || propertyName.includes(query) || tenant.phone.includes(query);
  });

  const handleAddTenant = () => {
    router.push('/tenant/add');
  };

  const handleTenantPress = (tenantId: string) => {
    router.push(`/tenant/${tenantId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>{t.common.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder={`${t.common.search}...`}
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
      </View>

      {filteredTenants.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="people-outline" size={80} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>{t.tenant.noTenants}</Text>
          <Text style={styles.emptyText}>
            {searchQuery ? 'Aucun résultat trouvé' : 'Ajoutez votre premier locataire'}
          </Text>
          {!searchQuery && (
            <TouchableOpacity style={styles.addButton} onPress={handleAddTenant}>
              <Ionicons name="add" size={24} color="#fff" />
              <Text style={styles.addButtonText}>{t.tenant.addTenant}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredTenants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tenantCard}
              onPress={() => handleTenantPress(item.id)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.firstName[0]}{item.lastName[0]}
                </Text>
              </View>
              <View style={styles.tenantInfo}>
                <Text style={styles.tenantName}>
                  {item.firstName} {item.lastName}
                </Text>
                <View style={styles.propertyRow}>
                  <Ionicons name="home-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.propertyText}>{getPropertyName(item.propertyId)}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.contactText}>{item.phone}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleAddTenant}>
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
  header: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    paddingVertical: spacing.xs,
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
  tenantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#fff',
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  propertyText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  contactText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
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
