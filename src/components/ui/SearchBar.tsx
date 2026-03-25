// src/components/ui/SearchBar.tsx
// Barre de recherche réutilisable
// Peut être en mode "tap pour ouvrir" ou en mode "input actif"

import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  // Si tappable=true, un tap navigue vers l'écran recherche
  // Si tappable=false, c'est un vrai input actif
  tappable?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Rechercher une recette...',
  tappable = false,
}: SearchBarProps) {
  const router = useRouter();

  // Mode tappable = faux input qui navigue vers /recherche
  if (tappable) {
    return (
      <Pressable
        style={styles.container}
        onPress={() => router.push('/recherche')}
      >
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.placeholder}>{placeholder}</Text>
      </Pressable>
    );
  }

  // Mode input actif = vrai champ de saisie
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.miel}
        returnKeyType="search"
        autoCorrect={false}
      />
      {/* Bouton effacer si du texte est saisi */}
      {value && value.length > 0 && (
        <Pressable onPress={() => onChangeText?.('')}>
          <Text style={styles.clear}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.sable,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 0.5,
    borderColor: Colors.bordure2,
  },
  icon: {
    fontSize: 14,
  },
  placeholder: {
    fontSize: 13,
    color: Colors.miel,
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: Colors.encre,
    paddingVertical: 0,
  },
  clear: {
    fontSize: 12,
    color: Colors.miel,
    paddingHorizontal: 4,
  },
});