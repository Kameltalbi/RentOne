import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Reminder, Property } from '../../types';
import { storage } from '../../utils/storage';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../constants/theme';
import { format, isPast, isFuture } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function RemindersScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [remindersData, propertiesData] = await Promise.all([
      storage.getReminders(),
      storage.getProperties(),
    ]);
    setReminders(remindersData.sort((a, b) => 
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    ));
    setProperties(propertiesData);
    setLoading(false);
  };

  const getPropertyName = (propertyId: string) => {
    return properties.find(p => p.id === propertyId)?.name || 'Bien inconnu';
  };

  const toggleComplete = async (reminderId: string) => {
    const updated = reminders.map(r => 
      r.id === reminderId ? { ...r, isCompleted: !r.isCompleted } : r
    );
    setReminders(updated);
    await storage.saveReminders(updated);
  };

  const reminderIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    rent_indexation: 'trending-up',
    lease_renewal: 'document-text',
    charges_revision: 'calculator',
    custom: 'notifications',
  };

  const reminderColors: Record<string, string> = {
    rent_indexation: colors.info,
    lease_renewal: colors.warning,
    charges_revision: colors.secondary,
    custom: colors.primary,
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

  if (reminders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Ionicons name="notifications-outline" size={80} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>Aucun rappel</Text>
          <Text style={styles.emptyText}>Les rappels automatiques apparaîtront ici</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const dueDate = new Date(item.dueDate);
          const isOverdue = isPast(dueDate) && !item.isCompleted;
          const color = reminderColors[item.type];

          return (
            <TouchableOpacity 
              style={[
                styles.reminderCard,
                item.isCompleted && styles.completedCard,
              ]} 
              activeOpacity={0.7}
              onPress={() => toggleComplete(item.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <Ionicons 
                  name={reminderIcons[item.type]} 
                  size={24} 
                  color={color} 
                />
              </View>
              
              <View style={styles.reminderContent}>
                <Text style={[
                  styles.reminderTitle,
                  item.isCompleted && styles.completedText,
                ]}>
                  {item.title}
                </Text>
                
                {item.description && (
                  <Text style={styles.reminderDescription}>{item.description}</Text>
                )}
                
                <Text style={styles.propertyName}>{getPropertyName(item.propertyId)}</Text>
                
                <View style={styles.footer}>
                  <View style={[
                    styles.dateBadge,
                    isOverdue && styles.overdueBadge,
                  ]}>
                    <Ionicons 
                      name="calendar-outline" 
                      size={14} 
                      color={isOverdue ? colors.danger : colors.textSecondary} 
                    />
                    <Text style={[
                      styles.dateText,
                      isOverdue && styles.overdueText,
                    ]}>
                      {format(dueDate, 'dd MMM yyyy', { locale: fr })}
                    </Text>
                  </View>
                  
                  {item.isCompleted && (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                      <Text style={styles.completedBadgeText}>Terminé</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
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
  },
  listContent: {
    padding: spacing.md,
  },
  reminderCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    ...shadows.sm,
  },
  completedCard: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  reminderDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  propertyName: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  overdueBadge: {
    backgroundColor: colors.danger + '20',
  },
  dateText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  overdueText: {
    color: colors.danger,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  completedBadgeText: {
    fontSize: fontSize.xs,
    color: colors.success,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
});
