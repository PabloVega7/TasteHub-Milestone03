// src/pages/MyRecipes.jsx
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/RecipesContext";

export default function MyRecipes() {
  const { recipes } = useRecipes();

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
        <Typography variant="h4" fontWeight={700}>
          My Recipes
        </Typography>

        <Button variant="contained" component={Link} to="/add-recipe">
          Add New Recipe
        </Button>
      </Box>

      {recipes.length === 0 ? (
        <Typography>No recipes yet. Start by adding one!</Typography>
      ) : (
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
        </Grid>
      )}
    </Container>
  );
}
