// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/RecipesContext";

export default function Home() {
  const { recipes } = useRecipes();

  const [searchTerm, setSearchTerm] = useState("");
  const [apiMeals, setApiMeals] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Filter LOCAL recipes by search term
  const filteredLocalRecipes = useMemo(
    () =>
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [recipes, searchTerm]
  );

  // Fetch from TheMealDB
  const fetchMeals = async (term) => {
    try {
      setApiLoading(true);
      setApiError(null);

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          term || "pasta"
        )}`
      );

      if (!res.ok) {
        throw new Error("Network error");
      }

      const data = await res.json();
      setApiMeals(data.meals || []);
    } catch (err) {
      console.error(err);
      setApiError("Could not load recipes from the API.");
    } finally {
      setApiLoading(false);
    }
  };

  // Load some default API recipes on first load
  useEffect(() => {
    fetchMeals("pasta");
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // When user presses Enter in the search bar, update API results too
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchMeals(searchTerm);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Search Recipes
      </Typography>

      {/* Shared search bar */}
      <TextField
        fullWidth
        label="Search for recipes..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        sx={{ mb: 4, backgroundColor: "white" }}
      />

      {/* ======== LOCAL RECIPES SECTION ======== */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        My Recipes
      </Typography>

      {filteredLocalRecipes.length === 0 ? (
        <Typography variant="body2" color="text.secondary" mb={4}>
          No recipes found in your collection.
        </Typography>
      ) : (
        <Grid container spacing={3} mb={4}>
          {filteredLocalRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ======== API RECIPES SECTION ======== */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recipes from the Web
        </Typography>

        {apiLoading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        )}

        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        {!apiLoading && !apiError && apiMeals.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No recipes found from the API.
          </Typography>
        )}

        <Grid container spacing={3}>
          {apiMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              <RecipeCard
                title={meal.strMeal}
                image={meal.strMealThumb}
                onClick={() => {
                  // For now just open the YouTube or source link in a new tab if available
                  const url = meal.strSource || meal.strYoutube || undefined;
                  if (url) {
                    window.open(url, "_blank", "noopener,noreferrer");
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
