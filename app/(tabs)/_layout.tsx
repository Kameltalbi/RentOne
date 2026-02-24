import { Tabs, useRouter } from 'expo-router';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { useState } from 'react';

export default function TabLayout() {
  const { t } = useApp();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const MenuButton = () => (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
        <TouchableOpacity 
          onPress={() => router.push('/settings')}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setMenuVisible(true)}
          style={{ padding: 4 }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/(tabs)/expenses');
              }}
            >
              <Ionicons name="receipt-outline" size={20} color={colors.text} />
              <Text style={styles.menuText}>{t.tabs.expenses}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/(tabs)/analytics');
              }}
            >
              <Ionicons name="bar-chart-outline" size={20} color={colors.text} />
              <Text style={styles.menuText}>Analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/(tabs)/reminders');
              }}
            >
              <Ionicons name="notifications-outline" size={20} color={colors.text} />
              <Text style={styles.menuText}>{t.tabs.reminders}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t.dashboard.title,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
          headerRight: MenuButton,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.properties,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerRight: MenuButton,
        }}
      />
      <Tabs.Screen
        name="tenants"
        options={{
          title: t.tenant.title,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
          headerRight: MenuButton,
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: t.tabs.payments,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash" size={size} color={color} />
          ),
          headerRight: MenuButton,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.xs,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  menuText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
});
