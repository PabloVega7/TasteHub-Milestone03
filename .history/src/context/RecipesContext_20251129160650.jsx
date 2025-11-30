// src/context/RecipesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const RecipesContext = createContext();
const STORAGE_KEY = "tastehub-recipes";

// Default starter recipes
const defaultRecipes = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    ingredients:
      "200g spaghetti\n2 eggs\n50g pancetta\nParmesan cheese\nSalt & pepper",
    instructions:
      "Boil the pasta until al dente.\nCook pancetta until crispy.\nWhisk eggs and cheese in a bowl.\nCombine everything off the heat and season.",
  },
  {
    id: "2",
    title: "Chicken Teriyaki",
    image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    ingredients:
      "Chicken thighs\nSoy sauce\nMirin\nSugar\nGarlic\nGinger\nRice",
    instructions:
      "Mix teriyaki sauce.\nPan fry chicken until browned.\nAdd sauce and simmer.\nServe over rice.",
  },
];

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Error reading recipes from localStorage", e);
    }
    return defaultRecipes;
  });

  // Sync to localStorage whenever recipes change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (e) {
      console.error("Error saving recipes to localStorage", e);
    }
  }, [recipes]);

  // Add recipe and return the id so we can navigate to it
  const addRecipe = (newRecipe) => {
    const id = newRecipe.id || Date.now().toString();
    const recipe = { ...newRecipe, id };
    setRecipes((prev) => [...prev, recipe]);
    return id;
  };

  const updateRecipe = (id, updated) => {
    setRecipes((prev) =>
      prev.map((r) =>
        String(r.id) === String(id) ? { ...r, ...updated, id: r.id } : r
      )
    );
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => String(r.id) !== String(id)));
  };

  return (
    <RecipesContext.Provider
      value={{ recipes, addRecipe, updateRecipe, deleteRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
}
