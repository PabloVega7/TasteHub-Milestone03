import { Container, Grid, TextField, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  // Placeholder data for Milestone 1
  const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      image:
        "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    },
    {
      id: 2,
      title: "Chicken Teriyaki",
      image:
        "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    },
    {
      id: 3,
      title: "Beef Stir Fry",
      image:
        "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Search Recipes
      </Typography>

      {/* Static search bar */}
      <TextField
        fullWidth
        label="Search for recipes..."
        variant="outlined"
        sx={{ mb: 4, backgroundColor: "white" }}
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
