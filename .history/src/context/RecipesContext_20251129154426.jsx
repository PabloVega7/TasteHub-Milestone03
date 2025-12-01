import { createContext, useContext, useEffect, useState } from "react";

const RecipesContext = createContext();
export const useRecipes = () => useContext(RecipesContext);

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("tastehub-recipes");
    if (stored) {
      try {
        setRecipes(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing stored recipes:", err);
        setRecipes([]);
      }
    }
  }, []);

  // Save to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem("tastehub-recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Add a new recipe
  const addRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now().toString(), // guaranteed unique
    };

    setRecipes((prev) => [...prev, recipeWithId]);
  };

  // Edit recipe
  const updateRecipe = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        addRecipe,
        updateRecipe,
      }}>
      {children}
    </RecipesContext.Provider>
  );
};
