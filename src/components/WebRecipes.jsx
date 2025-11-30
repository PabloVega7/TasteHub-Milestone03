// src/components/WebRecipes.jsx
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

export default function WebRecipes({ searchTerm = "" }) {
  const [webRecipes, setWebRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      
      try {
        let allMeals = [];

        if (searchTerm.trim()) {
          // Search by term
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm.trim())}`
          );
          const data = await res.json();
          
          if (data?.meals) {
            allMeals = data.meals;
          }
        } else {
          // Fetch popular recipes from multiple categories when no search term
          const categories = ["Chicken", "Beef", "Seafood", "Vegetarian", "Dessert", "Pasta"];
          const promises = categories.map(async (category) => {
            try {
              const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
              );
              const data = await res.json();
              return data?.meals || [];
            } catch (err) {
              return [];
            }
          });

          const results = await Promise.all(promises);
          // Flatten and get unique meals (by id)
          const mealMap = new Map();
          results.flat().forEach((meal) => {
            if (!mealMap.has(meal.idMeal)) {
              mealMap.set(meal.idMeal, meal);
            }
          });
          allMeals = Array.from(mealMap.values());
        }

        // Map meals to recipe format
        const mapped = allMeals.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          isWebRecipe: true,
        }));

        setWebRecipes(mapped);
      } catch (err) {
        console.error(err);
        setError("Couldn't load recipes from the web.");
        setWebRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(load, searchTerm.trim() ? 300 : 0);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  if (error) {
    return (
      <Typography variant="body2" color="error">
        {error}
      </Typography>
    );
  }

  if (loading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Loading recipes from the web...
      </Typography>
    );
  }

  if (!webRecipes.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No recipes found. Try a different search term.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {webRecipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            isWebRecipe={recipe.isWebRecipe}
          />
        </Grid>
      ))}
    </Grid>
  );
}
