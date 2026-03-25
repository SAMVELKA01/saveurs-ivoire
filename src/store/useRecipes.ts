// src/store/useRecipes.ts
// State global pour les recettes : filtres, tri, recherche

import { create } from 'zustand';
import { Recipe, Category } from '../types/recipe';
import {
  RECIPES,
  getShuffledRecipes,
  searchRecipes,
  getRecipesByCategory,
} from '../data/recipes';

type SortOption = 'aleatoire' | 'duree' | 'difficulte' | 'az';

interface RecipesStore {
  // Toutes les recettes (mélangées au démarrage)
  allRecipes: Recipe[];
  // Recettes filtrées/triées à afficher
  filteredRecipes: Recipe[];
  // Catégorie active (null = toutes)
  activeCategory: Category | null;
  // Option de tri active
  sortOption: SortOption;
  // Terme de recherche
  searchQuery: string;

  // Actions
  initRecipes: () => void;
  setCategory: (category: Category | null) => void;
  setSortOption: (option: SortOption) => void;
  setSearchQuery: (query: string) => void;
}

export const useRecipes = create<RecipesStore>((set, get) => ({
  allRecipes: [],
  filteredRecipes: [],
  activeCategory: null,
  sortOption: 'aleatoire',
  searchQuery: '',

  // Initialiser avec les recettes mélangées
  initRecipes: () => {
    const shuffled = getShuffledRecipes();
    set({ allRecipes: shuffled, filteredRecipes: shuffled });
  },

  // Changer de catégorie et recalculer les recettes affichées
  setCategory: (category) => {
    set({ activeCategory: category });
    get().applyFilters();
  },

  // Changer le tri
  setSortOption: (option) => {
    set({ sortOption: option });
    get().applyFilters();
  },

  // Recherche textuelle
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  // Applique tous les filtres + tri en même temps
  applyFilters: () => {
    const { activeCategory, sortOption, searchQuery } = get();

    // 1. Partir de toutes les recettes
    let result = [...RECIPES];

    // 2. Filtrer par recherche
    if (searchQuery.trim()) {
      result = searchRecipes(searchQuery);
    }

    // 3. Filtrer par catégorie
    if (activeCategory) {
      result = result.filter((r) => r.category === activeCategory);
    }

    // 4. Trier
    switch (sortOption) {
      case 'aleatoire':
        result = result.sort(() => Math.random() - 0.5);
        break;
      case 'duree':
        result = result.sort(
          (a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime)
        );
        break;
      case 'difficulte':
        const order = { facile: 0, moyen: 1, difficile: 2 };
        result = result.sort(
          (a, b) => order[a.difficulty] - order[b.difficulty]
        );
        break;
      case 'az':
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    set({ filteredRecipes: result });
  },
} as any));