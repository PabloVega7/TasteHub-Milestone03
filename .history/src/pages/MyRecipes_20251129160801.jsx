// src/pages/MyRecipes.jsx
import { Container, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipes() {
  const { recipes } = useRecipes();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        My Recipes
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => navigate("/add-recipe")}>
        Add New Recipe
      </Button>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
            />
          </Grid>
        ))}
        {recipes.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            You don&apos;t have any recipes yet.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
