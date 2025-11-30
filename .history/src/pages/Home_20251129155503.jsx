// src/pages/Home.jsx
import { useState } from "react";
import { Container, Typography, TextField, Box, Grid } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import WebRecipes from "../components/WebRecipes";
import { useRecipes } from "../context/RecipesContext";

export default function Home() {
  const { recipes } = useRecipes();
  const [query, setQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Page title */}
      <Typography variant="h4" fontWeight={700} mb={3}>
        Search Recipes
      </Typography>

      {/* Search bar */}
      <TextField
        fullWidth
        label="Search for recipes..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 4, backgroundColor: "white" }}
      />

      {/* My Recipes section */}
      <Box mb={6}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          My Recipes
        </Typography>

        <Grid container spacing={3}>
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
              />
            </Grid>
          ))}

          {filteredRecipes.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              No recipes found. Try a different search or add a new recipe.
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Web recipes section */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recipes from the Web
        </Typography>

        {/* WebRecipes can optionally use `query` later if we wire it up */}
        <WebRecipes />
      </Box>
    </Container>
  );
}
