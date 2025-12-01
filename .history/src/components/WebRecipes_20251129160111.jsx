// src/components/WebRecipes.jsx
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

export default function WebRecipes() {
  const [webRecipes, setWebRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        // Simple example: fetch some pasta meals from TheMealDB
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=pasta"
        );
        const data = await res.json();

        if (data?.meals) {
          const mapped = data.meals.slice(0, 3).map((meal) => ({
            id: meal.idMeal,
            title: meal.strMeal,
            image: meal.strMealThumb,
            // Direct user to the external meal page
            url: `https://www.themealdb.com/meal/${meal.idMeal}`,
          }));
          setWebRecipes(mapped);
        } else {
          setWebRecipes([]);
        }
      } catch (err) {
        console.error(err);
        setError("Couldn't load recipes from the web.");
      }
    }

    load();
  }, []);

  if (error) {
    return (
      <Typography variant="body2" color="error">
        {error}
      </Typography>
    );
  }

  if (!webRecipes.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        Loading recipes from the web...
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
            externalUrl={recipe.url}
          />
        </Grid>
      ))}
    </Grid>
  );
}
