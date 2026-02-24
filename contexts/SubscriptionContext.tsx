import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SubscriptionContextType {
  isPremium: boolean;
  setPremium: (value: boolean) => void;
  canAddProperty: (currentCount: number) => boolean;
  propertyLimit: number;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    loadSubscriptionStatus();
  }, []);

  const loadSubscriptionStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('premium_status');
      setIsPremium(status === 'true');
    } catch (error) {
      console.error('Error loading subscription status:', error);
    }
  };

  const setPremium = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('premium_status', value.toString());
      setIsPremium(value);
    } catch (error) {
      console.error('Error saving subscription status:', error);
    }
  };

  const canAddProperty = (currentCount: number): boolean => {
    if (isPremium) return true;
    return currentCount < 1; // Free users: 1 property max
  };

  const propertyLimit = isPremium ? -1 : 1; // -1 means unlimited

  return (
    <SubscriptionContext.Provider value={{ isPremium, setPremium, canAddProperty, propertyLimit }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
