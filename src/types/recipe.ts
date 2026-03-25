export type Difficulty = 'facile' | 'moyen' | 'difficile';

export type Category =
  | 'plats-chauds'
  | 'plats-froids'
  | 'petit-dejeuner'
  | 'boissons'
  | 'street-food'
  | 'festif'
  | 'desserts'
  | 'vegetarien';

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Step {
  instruction: string;
  tip?: string;
  timerMinutes?: number;
  ingredients?: string[];
}

export interface Recipe {
  id: string;
  title: string;
  category: Category;
  emoji: string;
  description: string;
  difficulty: Difficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  region?: string;
  ingredients: Ingredient[];
  steps: Step[];
  tags?: string[];
}