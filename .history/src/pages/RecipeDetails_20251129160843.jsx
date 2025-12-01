// src/pages/RecipeDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRecipes } from "../context/RecipesContext";

const STORAGE_KEY = "tastehub-recipes";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();

  // If context is empty (edge case) fall back to localStorage
  let allRecipes = recipes;
  if (!allRecipes || allRecipes.length === 0) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        allRecipes = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading recipes from localStorage", e);
      allRecipes = [];
    }
  }

  const recipe = allRecipes?.find((r) => String(r.id) === String(id)) || null;

  if (!recipe) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Recipe not found
        </Typography>
        <Typography variant="body1" mb={3}>
          We couldn&apos;t find this recipe. It might have been deleted or the
          link is invalid.
        </Typography>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}>
          Back to Home
        </Button>
        <Button variant="outlined" onClick={() => navigate("/my-recipes")}>
          Go to My Recipes
        </Button>
      </Container>
    );
  }

  const { title, image, ingredients, instructions } = recipe;

  const ingredientLines = (ingredients || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const instructionLines = (instructions || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        {title}
      </Typography>

      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            maxHeight: 420,
            objectFit: "cover",
            borderRadius: 2,
            mb: 4,
          }}
        />
      )}

      <Box mb={3}>
        <Typography variant="h6" fontWeight={600} mb={1}>
          Ingredients
        </Typography>
        {ingredientLines.length ? (
          <ul>
            {ingredientLines.map((line, index) => (
              <li key={index}>
                <Typography variant="body1">{line}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No ingredients listed.
          </Typography>
        )}
      </Box>

      <Box mb={4}>
        <Typography variant="h6" fontWeight={600} mb={1}>
          Instructions
        </Typography>
        {instructionLines.length ? (
          <ol>
            {instructionLines.map((line, index) => (
              <li key={index}>
                <Typography variant="body1">{line}</Typography>
              </li>
            ))}
          </ol>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No instructions provided.
          </Typography>
        )}
      </Box>

      <Button variant="outlined" onClick={() => navigate("/my-recipes")}>
        Back to My Recipes
      </Button>
    </Container>
  );
}
