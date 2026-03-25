// src/components/ui/CategoryChip.tsx
// Chip cliquable pour filtrer par catégorie
// Actif = fond terre de feu, Inactif = fond blanc

import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface CategoryChipProps {
  label: string;
  emoji?: string;
  active?: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  label,
  emoji,
  active = false,
  onPress,
}: CategoryChipProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && styles.chipPressed,
      ]}
      onPress={onPress}
    >
      {emoji && (
        <Text style={styles.emoji}>{emoji}</Text>
      )}
      <Text style={[styles.label, active && styles.labelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.bordure,
    backgroundColor: Colors.blanc,
  },
  chipActive: {
    backgroundColor: Colors.terre,
    borderColor: Colors.terre,
  },
  chipPressed: {
    opacity: 0.8,
  },
  emoji: {
    fontSize: 13,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.sable2,
  },
  labelActive: {
    color: Colors.creme,
  },
});