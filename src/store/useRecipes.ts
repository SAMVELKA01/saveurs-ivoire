// src/store/useRecipes.ts

import { create } from 'zustand';
import { Recipe, Category } from '../types/recipe';
import { RECIPES, getShuffledRecipes, searchRecipes } from '../data/recipes';

type SortOption = 'aleatoire' | 'duree' | 'difficulte' | 'az';

interface RecipesStore {
  allRecipes: Recipe[];
  filteredRecipes: Recipe[];
  activeCategory: Category | null;
  sortOption: SortOption;
  searchQuery: string;
  initRecipes: () => void;
  setCategory: (category: Category | null) => void;
  setSortOption: (option: SortOption) => void;
  setSearchQuery: (query: string) => void;
}

// Fonction utilitaire pure — en dehors du store
// Elle reçoit les paramètres et retourne les recettes filtrées
function applyFilters(
  activeCategory: Category | null,
  sortOption: SortOption,
  searchQuery: string
): Recipe[] {
  // 1. Partir de toutes les recettes
  let result = [...RECIPES];

  // 2. Filtrer par recherche textuelle
  if (searchQuery.trim()) {
    result = searchRecipes(searchQuery);
  }

  // 3. Filtrer par catégorie
  if (activeCategory) {
    result = result.filter((r) => r.category === activeCategory);
  }

  // 4. Trier selon l'option choisie
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

  return result;
}

export const useRecipes = create<RecipesStore>((set, get) => ({
  allRecipes: [],
  filteredRecipes: [],
  activeCategory: null,
  sortOption: 'aleatoire',
  searchQuery: '',

  initRecipes: () => {
    const shuffled = getShuffledRecipes();
    set({ allRecipes: shuffled, filteredRecipes: shuffled });
  },

  setCategory: (category) => {
    const { sortOption, searchQuery } = get();
    set({
      activeCategory: category,
      filteredRecipes: applyFilters(category, sortOption, searchQuery),
    });
  },

  setSortOption: (option) => {
    const { activeCategory, searchQuery } = get();
    set({
      sortOption: option,
      filteredRecipes: applyFilters(activeCategory, option, searchQuery),
    });
  },

  setSearchQuery: (query) => {
    const { activeCategory, sortOption } = get();
    set({
      searchQuery: query,
      filteredRecipes: applyFilters(activeCategory, sortOption, query),
    });
  },
}));