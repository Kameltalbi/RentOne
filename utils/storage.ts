import AsyncStorage from '@react-native-async-storage/async-storage';
import { Property, Tenant, Payment, Expense, Reminder } from '../types';

const KEYS = {
  PROPERTIES: '@rentone_properties',
  TENANTS: '@rentone_tenants',
  PAYMENTS: '@rentone_payments',
  EXPENSES: '@rentone_expenses',
  REMINDERS: '@rentone_reminders',
};

export const storage = {
  async getProperties(): Promise<Property[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.PROPERTIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading properties:', error);
      return [];
    }
  },

  async saveProperties(properties: Property[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.PROPERTIES, JSON.stringify(properties));
    } catch (error) {
      console.error('Error saving properties:', error);
    }
  },

  async getTenants(): Promise<Tenant[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.TENANTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading tenants:', error);
      return [];
    }
  },

  async saveTenants(tenants: Tenant[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.TENANTS, JSON.stringify(tenants));
    } catch (error) {
      console.error('Error saving tenants:', error);
    }
  },

  async getPayments(): Promise<Payment[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.PAYMENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading payments:', error);
      return [];
    }
  },

  async savePayments(payments: Payment[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.PAYMENTS, JSON.stringify(payments));
    } catch (error) {
      console.error('Error saving payments:', error);
    }
  },

  async getExpenses(): Promise<Expense[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.EXPENSES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading expenses:', error);
      return [];
    }
  },

  async saveExpenses(expenses: Expense[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  },

  async getReminders(): Promise<Reminder[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.REMINDERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading reminders:', error);
      return [];
    }
  },

  async saveReminders(reminders: Reminder[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.REMINDERS, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
