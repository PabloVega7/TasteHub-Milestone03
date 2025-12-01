import { Container, Grid, TextField, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  // Placeholder data for Milestone 1
  const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "Chicken Teriyaki",
      image: "https://via.placeholder.com/300",
    },
    { id: 3, title: "Beef Stir Fry", image: "https://via.placeholder.com/300" },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Search Recipes
      </Typography>

      {/* Static search bar */}
      <TextField
        fullWidth
        label="Search for recipes..."
        variant="outlined"
        sx={{ mb: 4 }}
      />

      {/* Recipe grid */}
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard title={recipe.title} image={recipe.image} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
