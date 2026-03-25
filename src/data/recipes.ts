import { Recipe } from '../types/recipe';

export const RECIPES: Recipe[] = [
  {
    id: 'sauce-graine-01',
    title: 'Sauce graine au crabe fumé',
    category: 'plats-chauds',
    emoji: '🌿',
    description: 'La sauce graine est un pilier de la cuisine ivoirienne. Préparée à base de noix de palme, elle se marie parfaitement avec le riz ou le foutou banane.',
    difficulty: 'moyen',
    prepTime: 15,
    cookTime: 60,
    servings: 4,
    region: 'National',
    tags: ['populaire', 'festif'],
    ingredients: [
      { name: 'Noix de palme', quantity: '500 g' },
      { name: 'Crabe fumé', quantity: '2 pièces' },
      { name: 'Huile de palme', quantity: '3 c.s.' },
      { name: 'Piment vert frais', quantity: '2 pièces' },
      { name: 'Oignon', quantity: '1 moyen' },
      { name: "Cube d'assaisonnement", quantity: '2 cubes' },
      { name: 'Sel', quantity: 'selon goût' },
    ],
    steps: [
      {
        instruction: "Faire bouillir les noix de palme 20 minutes jusqu'à ramollissement.",
        timerMinutes: 20,
        tip: "Les noix sont prêtes quand elles s'écrasent facilement entre les doigts.",
        ingredients: ['Noix de palme'],
      },
      {
        instruction: "Piler les noix et extraire le jus dans une passoire fine. Ajouter un peu d'eau tiède.",
        ingredients: ['Noix de palme'],
      },
      {
        instruction: "Faire revenir l'oignon émincé et le piment dans l'huile de palme 5 minutes.",
        timerMinutes: 5,
        ingredients: ['Huile de palme', 'Oignon', 'Piment vert frais'],
      },
      {
        instruction: 'Verser le jus de palme. Ajouter le crabe fumé nettoyé. Mélanger délicatement.',
        ingredients: ['Crabe fumé'],
      },
      {
        instruction: "Ajouter les cubes et le sel. Laisser mijoter 30 minutes à feu doux.",
        timerMinutes: 30,
        tip: "La sauce est prête quand l'huile remonte en surface.",
        ingredients: ["Cube d'assaisonnement", 'Sel'],
      },
      {
        instruction: 'Rectifier l\'assaisonnement. Servir chaud avec du riz ou du foutou banane.',
      },
    ],
  },
  {
    id: 'attieke-poisson-01',
    title: 'Attiéké au poisson braisé',
    category: 'plats-chauds',
    emoji: '🐟',
    description: "L'attiéké est la semoule de manioc ivoirienne par excellence. Léger et savoureux, il accompagne à merveille le poisson braisé.",
    difficulty: 'facile',
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    region: 'Abidjan',
    tags: ['rapide', 'populaire'],
    ingredients: [
      { name: 'Attiéké', quantity: '400 g' },
      { name: 'Poisson braisé', quantity: '2 morceaux' },
      { name: 'Tomate fraîche', quantity: '2 moyennes' },
      { name: 'Oignon rouge', quantity: '1 moyen' },
      { name: 'Piment frais', quantity: '1 pièce' },
      { name: 'Huile végétale', quantity: '2 c.s.' },
      { name: 'Jus de citron', quantity: '1 citron' },
    ],
    steps: [
      {
        instruction: "Faire cuire l'attiéké à la vapeur 10 minutes.",
        timerMinutes: 10,
        tip: "L'attiéké est cuit quand il est gonflé et légèrement translucide.",
        ingredients: ['Attiéké'],
      },
      {
        instruction: "Couper les tomates et l'oignon en dés. Émincer le piment.",
        ingredients: ['Tomate fraîche', 'Oignon rouge', 'Piment frais'],
      },
      {
        instruction: "Faire revenir l'oignon 2 min. Ajouter tomates et piment. Cuire 8 minutes.",
        timerMinutes: 10,
        ingredients: ['Oignon rouge', 'Tomate fraîche', 'Huile végétale'],
      },
      {
        instruction: "Dresser : attiéké, poisson braisé, sauce tomate. Arroser de citron.",
        tip: "Presser le citron au dernier moment pour garder la fraîcheur.",
        ingredients: ['Jus de citron'],
      },
    ],
  },
  {
    id: 'gnamankoudji-01',
    title: 'Gnamankoudji au gingembre',
    category: 'boissons',
    emoji: '🥤',
    description: "Le gnamankoudji est la boisson ivoirienne au gingembre, rafraîchissante et légèrement piquante. Idéale pour les grandes chaleurs.",
    difficulty: 'facile',
    prepTime: 15,
    cookTime: 0,
    servings: 6,
    region: 'National',
    tags: ['rapide', 'rafraichissant', 'sans-cuisson'],
    ingredients: [
      { name: 'Gingembre frais', quantity: '200 g' },
      { name: 'Eau froide', quantity: '1.5 L' },
      { name: 'Sucre', quantity: '100 g' },
      { name: 'Jus de citron vert', quantity: '2 citrons' },
      { name: 'Menthe fraîche', quantity: '1 bouquet' },
    ],
    steps: [
      {
        instruction: "Éplucher et râper le gingembre. Extraire le jus dans une passoire fine.",
        tip: "Plus le gingembre est râpé finement, plus le jus sera concentré.",
        ingredients: ['Gingembre frais'],
      },
      {
        instruction: "Mélanger le jus de gingembre avec l'eau froide. Ajouter le sucre et remuer.",
        ingredients: ['Eau froide', 'Sucre'],
      },
      {
        instruction: "Presser les citrons. Ajouter le jus et la menthe fraîche.",
        tip: "Pour une version festive, ajouter une pincée de clou de girofle.",
        ingredients: ['Jus de citron vert', 'Menthe fraîche'],
      },
      {
        instruction: "Réfrigérer 30 minutes. Servir bien frais avec des glaçons.",
        timerMinutes: 30,
      },
    ],
  },
];

export const getRecipeById = (id: string): Recipe | undefined =>
  RECIPES.find((r) => r.id === id);

export const getRecipesByCategory = (category: string): Recipe[] =>
  RECIPES.filter((r) => r.category === category);

export const getShuffledRecipes = (): Recipe[] =>
  [...RECIPES].sort(() => Math.random() - 0.5);

export const searchRecipes = (query: string): Recipe[] => {
  const q = query.toLowerCase().trim();
  return RECIPES.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(q)) ||
      r.tags?.some((t) => t.toLowerCase().includes(q))
  );
};