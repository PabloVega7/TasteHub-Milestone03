// src/context/RecipesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const RecipesContext = createContext();

// Default starter recipes (shown on first load if nothing in localStorage)
const initialRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    shortDescription: "Classic Italian pasta with pancetta and parmesan.",
    ingredients: [
      "200g spaghetti",
      "2 eggs",
      "50g pancetta",
      "Parmesan cheese",
      "Salt & pepper",
    ],
    instructions: [
      "Boil the pasta until al dente.",
      "Cook pancetta until crispy.",
      "Whisk eggs and cheese in a bowl.",
      "Combine everything off the heat and season.",
    ],
  },
  {
    id: 2,
    title: "Chicken Teriyaki",
    image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    shortDescription: "Sweet and savoury glazed chicken over rice.",
    ingredients: [
      "2 chicken breasts",
      "Teriyaki sauce",
      "Sesame seeds",
      "Green onions",
      "Cooked rice",
    ],
    instructions: [
      "Slice chicken into strips.",
      "Cook chicken in a pan until browned.",
      "Add teriyaki sauce and simmer until thickened.",
      "Serve over rice and garnish with sesame seeds and green onions.",
    ],
  },
  {
    id: 3,
    title: "Beef Stir Fry",
    image: "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
    shortDescription: "Quick beef stir fry with veggies.",
    ingredients: [
      "200g beef strips",
      "Mixed vegetables",
      "Soy sauce",
      "Garlic",
      "Ginger",
    ],
    instructions: [
      "Stir-fry beef over high heat.",
      "Add vegetables and cook until tender-crisp.",
      "Add soy sauce, garlic, and ginger.",
      "Toss everything together and serve hot.",
    ],
  },
];

export function RecipesProvider({ children }) {
  // Load from localStorage on first render, otherwise use initialRecipes
  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem("tastehub-recipes");
      return stored ? JSON.parse(stored) : initialRecipes;
    } catch (err) {
      console.error("Failed to parse recipes from localStorage", err);
      return initialRecipes;
    }
  });

  // Persist recipes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("tastehub-recipes", JSON.stringify(recipes));
    } catch (err) {
      console.error("Failed to save recipes to localStorage", err);
    }
  }, [recipes]);

  const getRecipeById = (id) =>
    recipes.find((r) => String(r.id) === String(id));

  const addRecipe = (recipeData) => {
    let newId = null;

    setRecipes((prev) => {
      const maxId = prev.reduce((max, r) => Math.max(max, Number(r.id)), 0);
      newId = maxId + 1;

      const newRecipe = {
        id: newId,
        ...recipeData,
        // could be useful later if you want to filter My Recipes
        isUserRecipe: true,
      };

      return [...prev, newRecipe];
    });

    return newId;
  };

  const updateRecipe = (id, updates) => {
    setRecipes((prev) =>
      prev.map((r) => (String(r.id) === String(id) ? { ...r, ...updates } : r))
    );
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => String(r.id) !== String(id)));
  };

  const value = {
    recipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  };

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) {
    throw new Error("useRecipes must be used inside RecipesProvider");
  }
  return ctx;
}
