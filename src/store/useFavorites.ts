// src/store/useFavorites.ts
// Gestion des favoris avec persistance locale (AsyncStorage)
// Zustand = state management ultra-simple

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clé de stockage dans AsyncStorage
const STORAGE_KEY = 'saveurs_ivoire_favorites';

interface FavoritesStore {
  // Liste des IDs des recettes favorites
  favorites: string[];
  // Charger les favoris depuis AsyncStorage au démarrage
  loadFavorites: () => Promise<void>;
  // Ajouter ou retirer un favori
  toggleFavorite: (id: string) => Promise<void>;
  // Vérifier si une recette est en favori
  isFavorite: (id: string) => boolean;
}

export const useFavorites = create<FavoritesStore>((set, get) => ({
  favorites: [],

  // Appelé une seule fois au démarrage de l'app
  loadFavorites: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ favorites: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
    }
  },

  // Toggle = si déjà favori on retire, sinon on ajoute
  toggleFavorite: async (id: string) => {
    const { favorites } = get();
    const newFavorites = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    // On met à jour le state immédiatement (UX réactive)
    set({ favorites: newFavorites });

    // Puis on sauvegarde en arrière-plan
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erreur sauvegarde favoris:', error);
    }
  },

  // Simple vérification booléenne
  isFavorite: (id: string) => get().favorites.includes(id),
}));