import { useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/RecipesContext";

export default function Home() {
  const { recipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Search Recipes
      </Typography>

      <TextField
        fullWidth
        label="Search for recipes..."
        variant="outlined"
        sx={{ mb: 4, backgroundColor: "white" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredRecipes.length === 0 ? (
        <Typography color="text.secondary">
          No recipes found. Try a different search term.
        </Typography>
      ) : (
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
        </Grid>
      )}
    </Container>
  );
}
