// src/components/layout/SectionHeader.tsx
// En-tête de section réutilisable (titre + lien "Voir tout")

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
}

export default function SectionHeader({
  title,
  subtitle,
  onSeeAll,
}: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      {onSeeAll && (
        <Pressable onPress={onSeeAll}>
          <Text style={styles.link}>Voir tout</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.encre,
  },
  subtitle: {
    fontSize: 10,
    color: Colors.miel,
    marginTop: 2,
  },
  link: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.terre,
  },
});