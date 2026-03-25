// src/components/ui/RecipeCardWide.tsx
// Card recette format horizontal — utilisée dans les listes et Favoris

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Recipe } from '../../types/recipe';
import { Colors, DifficultyColors } from '../../theme/colors';

interface RecipeCardWideProps {
  recipe: Recipe;
  onPress?: () => void;
}

export default function RecipeCardWide({ recipe, onPress }: RecipeCardWideProps) {
  const router = useRouter();
  const handlePress = onPress ?? (() => router.push(('/recette/' + recipe.id) as any));
  const diffColor = DifficultyColors[recipe.difficulty];

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
    >
      {/* Emoji à gauche */}
      <View style={[styles.imageZone, { backgroundColor: getEmojiBackground(recipe.category) }]}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>

      {/* Contenu au centre */}
      <View style={styles.body}>
        <Text style={styles.category} numberOfLines={1}>
          {formatCategory(recipe.category)}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.time}>
            ⏱ {recipe.prepTime + recipe.cookTime} min
          </Text>
          <View style={[styles.diffBadge, { backgroundColor: diffColor.bg }]}>
            <Text style={[styles.diffText, { color: diffColor.text }]}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      {/* Flèche à droite */}
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

function getEmojiBackground(category: string): string {
  const map: Record<string, string> = {
    'plats-chauds':   '#FEF0E7',
    'plats-froids':   '#E6F1FB',
    'petit-dejeuner': '#FAEEDA',
    'boissons':       '#E1F5EE',
    'street-food':    '#FAEEDA',
    'festif':         '#FEF0E7',
    'desserts':       '#FBEAF0',
    'vegetarien':     '#EAF3DE',
  };
  return map[category] ?? '#F0E6D6';
}

function formatCategory(category: string): string {
  const map: Record<string, string> = {
    'plats-chauds':   'Plat chaud',
    'plats-froids':   'Plat froid',
    'petit-dejeuner': 'Petit-déj',
    'boissons':       'Boisson',
    'street-food':    'Street food',
    'festif':         'Festif',
    'desserts':       'Dessert',
    'vegetarien':     'Végétarien',
  };
  return map[category] ?? category;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.blanc,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: Colors.bordure,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  imageZone: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: {
    fontSize: 32,
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  category: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.terre,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.encre,
    lineHeight: 16,
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  time: {
    fontSize: 9,
    color: Colors.miel,
  },
  diffBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  diffText: {
    fontSize: 9,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 22,
    color: Colors.terre,
    paddingRight: 14,
    fontWeight: '300',
  },
});