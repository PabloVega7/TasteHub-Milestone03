import { Container, Typography, Box } from "@mui/material";

export default function RecipeDetails() {
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Recipe Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 800,
        }}>
        <Typography variant="h6">Spaghetti Carbonara</Typography>
        <img
          src="https://via.placeholder.com/600x300"
          alt="Spaghetti Carbonara"
          style={{ borderRadius: 8 }}
        />

        <Typography variant="subtitle1" fontWeight={600}>
          Ingredients
        </Typography>
        <Typography>
          • 200g spaghetti
          <br />
          • 2 eggs
          <br />
          • 50g pancetta
          <br />
          • Parmesan cheese
          <br />• Salt & pepper
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Instructions
        </Typography>
        <Typography>
          1. Boil the pasta until al dente.
          <br />
          2. Cook pancetta until crispy.
          <br />
          3. Whisk eggs and cheese in a bowl.
          <br />
          4. Combine everything off the heat and season.
        </Typography>
      </Box>
    </Container>
  );
}
