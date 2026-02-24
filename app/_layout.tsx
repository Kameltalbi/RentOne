import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from '../contexts/AppContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="property/add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="property/[id]" />
          <Stack.Screen name="tenant/add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="tenant/[id]" />
          <Stack.Screen name="payment/add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="expense/add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
        </Stack>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
