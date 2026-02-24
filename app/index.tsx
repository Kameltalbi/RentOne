import { useEffect, useState } from 'react';
import { colors } from '../constants/theme';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ RentOne fonctionne !</Text>
      <Text style={styles.subtitle}>L'application démarre correctement</Text>
    </View>
  );
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Redirect href={hasCompletedOnboarding ? "/(tabs)" : "/onboarding"} />;
}
