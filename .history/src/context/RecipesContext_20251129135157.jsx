// src/context/RecipesContext.jsx
import { createContext, useContext, useState } from "react";

const RecipesContext = createContext();

const initialRecipes = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    shortDescription:
      "Classic Italian pasta with eggs, cheese, pancetta, and black pepper.",
    ingredients: [
      "200g spaghetti",
      "2 eggs",
      "50g pancetta",
      "30g grated Parmesan cheese",
      "Salt & black pepper",
    ],
    instructions: [
      "Boil the pasta in salted water until al dente.",
      "Cook pancetta in a pan until crispy.",
      "Whisk eggs and Parmesan together in a bowl.",
      "Drain pasta, keeping a bit of the cooking water.",
      "Combine pasta with pancetta, remove from heat, then stir in egg mixture.",
      "Season with salt and plenty of black pepper.",
    ],
  },
  {
    id: "2",
    title: "Chicken Teriyaki",
    image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    shortDescription:
      "Pan-seared chicken in a sweet and savoury teriyaki glaze.",
    ingredients: [
      "2 chicken thighs",
      "3 tbsp soy sauce",
      "2 tbsp mirin",
      "1 tbsp sugar",
      "1 tbsp vegetable oil",
      "Sesame seeds & green onions (optional)",
    ],
    instructions: [
      "Mix soy sauce, mirin, and sugar to make the teriyaki sauce.",
      "Heat oil in a pan and sear chicken thighs on both sides.",
      "Pour sauce over the chicken and let it simmer until thick and glossy.",
      "Slice chicken and serve over rice with extra sauce.",
      "Garnish with sesame seeds and chopped green onions.",
    ],
  },
  {
    id: "3",
    title: "Beef Stir Fry",
    image: "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
    shortDescription:
      "Quick stir-fried beef with vegetables in a savoury sauce.",
    ingredients: [
      "250g beef strips",
      "1 red bell pepper",
      "1 cup broccoli florets",
      "2 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp cornstarch",
      "1 clove garlic",
      "1 tbsp oil",
    ],
    instructions: [
      "Slice beef and vegetables into thin strips.",
      "Mix soy sauce, oyster sauce, and cornstarch with a splash of water.",
      "Stir-fry beef in hot oil until browned, then remove from pan.",
      "Stir-fry vegetables and garlic until crisp-tender.",
      "Return beef to pan, pour in sauce, and cook until thickened.",
      "Serve immediately with steamed rice.",
    ],
  },
];

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState(initialRecipes);

  const addRecipe = (recipeData) => {
    const newId = Date.now().toString();
    const newRecipe = { id: newId, ...recipeData };
    setRecipes((prev) => [...prev, newRecipe]);
    return newId; // callers can navigate to /recipe/newId
  };

  const updateRecipe = (id, updates) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id.toString() === id.toString()
          ? { ...recipe, ...updates }
          : recipe
      )
    );
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) =>
      prev.filter((recipe) => recipe.id.toString() !== id.toString())
    );
  };

  const getRecipeById = (id) =>
    recipes.find((recipe) => recipe.id.toString() === id.toString());

  return (
    <RecipesContext.Provider
      value={{ recipes, addRecipe, updateRecipe, deleteRecipe, getRecipeById }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
}
