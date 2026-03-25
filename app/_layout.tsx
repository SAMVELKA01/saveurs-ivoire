// app/_layout.tsx
// Point d'entrée de toute l'application.
// Expo Router charge ce fichier en premier à chaque ouverture.

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

// On empêche le splash screen de disparaître
// avant que les fonts soient chargées
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Chargement des polices personnalisées
  const [fontsLoaded, fontError] = useFonts({
    // Pour l'instant on utilise les fonts système
    // On ajoutera Playfair + DM Sans dans une prochaine étape
  });

  useEffect(() => {
    // Dès que les fonts sont prêtes (ou en cas d'erreur),
    // on cache le splash screen
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // On attend que les fonts soient chargées
  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      {/* Barre de statut en mode sombre sur fond clair */}
      <StatusBar style="dark" />

      {/* Stack = pile de navigation. headerShown:false = pas de header natif */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* L'écran (tabs) est notre Tab Bar principale */}
        <Stack.Screen name="(tabs)" />
        {/* L'écran recette/[id] est une page modale qui s'ouvre par-dessus */}
        <Stack.Screen name="recette/[id]" />
        {/* Le mode cuisine s'ouvre en plein écran */}
        <Stack.Screen name="cuisine/[id]" />
      </Stack>
    </>
  );
}