// src/components/ui/RecipeCard.tsx
// Card recette utilisée dans la grille 2 colonnes
// Reçoit une recette en props et affiche : emoji, titre, temps, difficulté

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Recipe } from '../../types/recipe';
import { Colors, DifficultyColors } from '../../theme/colors';

// On définit les props que ce composant accepte
interface RecipeCardProps {
  recipe: Recipe;
  onPress?: () => void;
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const router = useRouter();

  // Si onPress n'est pas fourni, on navigue vers la fiche recette par défaut
  const handlePress = onPress ?? (() => router.push(('/recette/' + recipe.id) as any));

  // Couleurs selon la difficulté
  const diffColor = DifficultyColors[recipe.difficulty];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={handlePress}
    >
      {/* Zone image / emoji */}
      <View style={[styles.imageZone, { backgroundColor: getEmojiBackground(recipe.category) }]}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>

      {/* Contenu */}
      <View style={styles.body}>
        {/* Catégorie */}
        <Text style={styles.category} numberOfLines={1}>
          {formatCategory(recipe.category)}
        </Text>

        {/* Titre */}
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>

        {/* Footer : temps + difficulté */}
        <View style={styles.footer}>
          <Text style={styles.time}>
            {recipe.prepTime + recipe.cookTime} min
          </Text>
          <View style={[styles.diffBadge, { backgroundColor: diffColor.bg }]}>
            <Text style={[styles.diffText, { color: diffColor.text }]}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// Couleur de fond selon la catégorie
function getEmojiBackground(category: string): string {
  const map: Record<string, string> = {
    'plats-chauds':    '#FEF0E7',
    'plats-froids':    '#E6F1FB',
    'petit-dejeuner':  '#FAEEDA',
    'boissons':        '#E1F5EE',
    'street-food':     '#FAEEDA',
    'festif':          '#FEF0E7',
    'desserts':        '#FBEAF0',
    'vegetarien':      '#EAF3DE',
  };
  return map[category] ?? '#F0E6D6';
}

// Formater le nom de catégorie pour l'affichage
function formatCategory(category: string): string {
  const map: Record<string, string> = {
    'plats-chauds':    'Plat chaud',
    'plats-froids':    'Plat froid',
    'petit-dejeuner':  'Petit-déj',
    'boissons':        'Boisson',
    'street-food':     'Street food',
    'festif':          'Festif',
    'desserts':        'Dessert',
    'vegetarien':      'Végétarien',
  };
  return map[category] ?? category;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.blanc,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: Colors.bordure,
    overflow: 'hidden',
    flex: 1,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  imageZone: {
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 40,
  },
  body: {
    padding: 10,
    paddingBottom: 12,
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
    marginBottom: 7,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});