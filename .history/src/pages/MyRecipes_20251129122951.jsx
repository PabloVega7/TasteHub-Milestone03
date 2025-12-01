import { Container, Typography, Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipes() {
  // Placeholder user recipes for Milestone 1
  const myRecipes = [
    {
      id: 101,
      title: "Grandma's Lasagna",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 102,
      title: "Vegan Buddha Bowl",
      image: "https://via.placeholder.com/300",
    },
  ];

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

      {myRecipes.length === 0 ? (
        <Typography>No recipes yet. Start by adding one!</Typography>
      ) : (
        <Grid container spacing={3}>
          {myRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard title={recipe.title} image={recipe.image} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
