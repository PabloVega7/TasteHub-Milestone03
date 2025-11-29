// src/pages/RecipeDetails.jsx
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeDetails() {
  const { id } = useParams(); // /recipe/:id
  const navigate = useNavigate();
  const { getRecipeById, deleteRecipe } = useRecipes();

  const recipe = getRecipeById(id);

  // If someone enters an invalid id in the URL
  if (!recipe) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h5" fontWeight={600}>
          Recipe not found.
        </Typography>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    );
  }

  // Normalize ingredients & instructions to arrays
  const ingredientsList = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : (recipe.ingredients || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

  const instructionsList = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : (recipe.instructions || "")
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmed) return;

    deleteRecipe(id);
    navigate("/");
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
        {/* Title + action buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}>
          <Typography variant="h5" fontWeight={600}>
            {recipe.title}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              component={Link}
              to={`/edit-recipe/${recipe.id}`}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Box>

        {/* Image */}
        {recipe.image && (
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
        )}

        {/* Ingredients */}
        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Ingredients
        </Typography>
        <Box component="ul" sx={{ pl: 3, m: 0 }}>
          {ingredientsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Box>

        {/* Instructions */}
        <Typography variant="subtitle1" fontWeight={600} mt={3}>
          Instructions
        </Typography>
        <Box component="ol" sx={{ pl: 3, m: 0 }}>
          {instructionsList.map((step, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {step}
            </li>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
