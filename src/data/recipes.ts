export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  category: string;
};

const BASE_RECIPES = [
  {
    title: "Tomato Basil Pasta",
    description: "A bright, comforting pasta with ripe tomatoes, fresh basil, garlic, and freshly grated parmesan.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80",
    prepTime: "20 min",
    category: "Italian",
  },
  {
    title: "Avocado Toast with Egg",
    description: "Toasted sourdough topped with smashed avocado, poached egg, chili flakes, and extra virgin olive oil.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
    prepTime: "10 min",
    category: "Breakfast",
  },
  {
    title: "Grilled Salmon Bowl",
    description: "Fresh Atlantic salmon over jasmine rice, roasted broccoli, cucumber slices, and sesame ginger drizzle.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
    prepTime: "25 min",
    category: "Healthy",
  },
  {
    title: "Classic Beef Burger",
    description: "Juicy beef patty with melted cheddar, crisp lettuce, ripe tomatoes, pickles, and special sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
    prepTime: "15 min",
    category: "American",
  },
  {
    title: "Berry Acai Bowl",
    description: "Blended acai smoothie topped with fresh strawberries, blueberries, granola, chia seeds, and honey.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=400&q=80",
    prepTime: "10 min",
    category: "Breakfast",
  },
  {
    title: "Chicken Caesar Salad",
    description: "Crisp romaine lettuce, grilled chicken breast, house-made croutons, and creamy caesar dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    prepTime: "15 min",
    category: "Salad",
  },
  {
    title: "Vegetable Curry",
    description: "Hearty coconut curry with sweet potatoes, chickpeas, spinach, and aromatic spices over basmati rice.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
    prepTime: "30 min",
    category: "Asian",
  },
  {
    title: "Margarita Pizza",
    description: "Hand-tossed crust with San Marzano tomato sauce, fresh mozzarella, and aromatic basil leaves.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80",
    prepTime: "25 min",
    category: "Italian",
  },
  {
    title: "Tacos al Pastor",
    description: "Marinated pork roasted with pineapple, served on warm corn tortillas with cilantro and diced onion.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80",
    prepTime: "20 min",
    category: "Mexican",
  },
  {
    title: "Matcha Latte Pancake",
    description: "Fluffy Japanese-style pancakes infused with ceremonial grade green tea matcha and maple syrup.",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80",
    prepTime: "20 min",
    category: "Dessert",
  },
];

export const THREE_RECIPES: Recipe[] = BASE_RECIPES.slice(0, 3).map((recipe, index) => ({
  ...recipe,
  id: `flash-3-${index + 1}`,
}));

export const HUNDRED_RECIPES: Recipe[] = Array.from({ length: 100 }, (_, index) => {
  const base = BASE_RECIPES[index % BASE_RECIPES.length];
  const itemNumber = index + 1;
  return {
    id: `recipe-100-${itemNumber}`,
    title: `${base.title} #${itemNumber}`,
    description: `${base.description} (Item #${itemNumber} in the 100-recipes benchmark list)`,
    image: base.image,
    prepTime: base.prepTime,
    category: base.category,
  };
});
