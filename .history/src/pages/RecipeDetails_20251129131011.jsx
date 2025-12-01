import { Container, Typography, Box } from "@mui/material";

export default function RecipeDetails() {
  // Static placeholder data for Milestone 1
  const recipe = {
    title: "Spaghetti Carbonara",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    ingredients: [
      "200g spaghetti",
      "2 eggs",
      "50g pancetta",
      "Parmesan cheese",
      "Salt & pepper",
    ],
    instructions: [
      "Boil the pasta until al dente.",
      "Cook pancetta until crispy.",
      "Whisk eggs and cheese in a bowl.",
      "Combine everything off the heat and season.",
    ],
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Recipe Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: 800,
        }}>
        {/* Title */}
        <Typography variant="h5" fontWeight={600}>
          {recipe.title}
        </Typography>

        {/* Image */}
        <Box
          component="img"
          src={recipe.image}
          alt={recipe.title}
          sx={{
            width: "100%",
            maxHeight: 320,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        {/* Ingredients */}
        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Ingredients
        </Typography>
        <Box component="ul" sx={{ pl: 3, m: 0 }}>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Box>

        {/* Instructions */}
        <Typography variant="subtitle1" fontWeight={600} mt={3}>
          Instructions
        </Typography>
        <Box component="ol" sx={{ pl: 3, m: 0 }}>
          {recipe.instructions.map((step, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {step}
            </li>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
