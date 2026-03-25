// src/components/layout/ScreenWrapper.tsx
// Wrapper qui applique le SafeArea + fond clair sur tous les écrans
// On l'utilise dans CHAQUE écran pour éviter de répéter le même code

import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

interface ScreenWrapperProps {
  children: React.ReactNode;
  // dark=true pour le mode cuisine (fond sombre)
  dark?: boolean;
}

export default function ScreenWrapper({
  children,
  dark = false,
}: ScreenWrapperProps) {
  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: dark ? Colors.nuit : Colors.creme },
      ]}
    >
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});