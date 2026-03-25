// src/components/ui/HeroBanner.tsx
// Bannière hero — recette mise en avant sur l'écran Accueil
// Affiche : emoji, badge, titre, méta-infos, bouton

import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Recipe } from '../../types/recipe';
import { Colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

interface HeroBannerProps {
  recipe: Recipe;
}

export default function HeroBanner({ recipe }: HeroBannerProps) {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => router.push(('/recette/' + recipe.id) as any)}
    >
      {/* Zone emoji / image */}
      <View style={styles.imageZone}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>

      {/* Overlay sombre en bas */}
      <View style={styles.overlay} />

      {/* Badge recette du jour */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Recette du jour</Text>
      </View>

      {/* Contenu texte en bas */}
      <View style={styles.content}>
        {/* Titre */}
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>

        {/* Méta-infos */}
        <View style={styles.meta}>
          <View style={styles.metaTag}>
            <Text style={styles.metaTagText}>
              {formatCategory(recipe.category)}
            </Text>
          </View>
          <Text style={styles.metaInfo}>
            ⏱ {recipe.prepTime + recipe.cookTime} min
          </Text>
          <Text style={styles.metaInfo}>
            🍽 {recipe.servings} pers.
          </Text>
        </View>
      </View>

      {/* Indicateurs de pagination */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </Pressable>
  );
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
  container: {
    marginHorizontal: 16,
    borderRadius: 22,
    overflow: 'hidden',
    height: 200,
    backgroundColor: Colors.terre,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  imageZone: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C85A1E',
  },
  emoji: {
    fontSize: 80,
    opacity: 0.9,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(26,18,8,0.75)',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: Colors.or,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.nuit,
  },
  content: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    right: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.creme,
    lineHeight: 24,
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaTag: {
    backgroundColor: 'rgba(200,90,30,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  metaTagText: {
    fontSize: 10,
    color: Colors.creme,
    fontWeight: '500',
  },
  metaInfo: {
    fontSize: 10,
    color: 'rgba(253,248,242,0.8)',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    right: 14,
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(253,248,242,0.3)',
  },
  dotActive: {
    width: 16,
    backgroundColor: Colors.or,
  },
});