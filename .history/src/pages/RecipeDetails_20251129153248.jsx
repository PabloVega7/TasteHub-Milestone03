// src/pages/RecipeDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();

  // 1) Try to find recipe in context
  let recipe = recipes.find((r) => String(r.id) === String(id)) || null;

  // 2) If not found, try localStorage as a fallback
  if (!recipe) {
    try {
      const stored = JSON.parse(
        localStorage.getItem("tastehub-recipes") || "[]"
      );
      recipe = stored.find((r) => String(r.id) === String(id)) || null;
    } catch {
      // ignore parse errors and keep recipe = null
    }
  }

  if (!recipe) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Recipe Details
        </Typography>
        <Typography variant="body1" mb={3}>
          We couldn’t find this recipe. It might have been deleted or the link
          is invalid.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mr: 2 }}>
          Back to Home
        </Button>
        <Button variant="outlined" onClick={() => navigate("/my-recipes")}>
          Go to My Recipes
        </Button>
      </Container>
    );
  }

  const { title, image, ingredients, instructions } = recipe;

  // Handle ingredients / instructions whether they’re arrays or a single string
  const ingredientLines =
    typeof ingredients === "string"
      ? ingredients.split("\n").filter((line) => line.trim().length > 0)
      : ingredients || [];

  const instructionLines =
    typeof instructions === "string"
      ? instructions.split("\n").filter((line) => line.trim().length > 0)
      : instructions || [];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Recipe Details
      </Typography>

      <Typography variant="h5" fontWeight={600} mb={2}>
        {title}
      </Typography>

      {image && (
        <Box mb={4}>
          <img
            src={image}
            alt={title}
            style={{
              maxWidth: "100%",
              borderRadius: 8,
              display: "block",
            }}
          />
        </Box>
      )}

      <Box mb={3}>
        <Typography variant="h6" fontWeight={600} mb={1}>
          Ingredients
        </Typography>
        {ingredientLines.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No ingredients listed.
          </Typography>
        ) : (
          <ul style={{ marginTop: 0 }}>
            {ingredientLines.map((line, index) => (
              <li key={index}>
                <Typography variant="body2">{line}</Typography>
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Box>
        <Typography variant="h6" fontWeight={600} mb={1}>
          Instructions
        </Typography>
        {instructionLines.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No instructions provided.
          </Typography>
        ) : (
          <ol style={{ marginTop: 0 }}>
            {instructionLines.map((line, index) => (
              <li key={index}>
                <Typography variant="body2">{line}</Typography>
              </li>
            ))}
          </ol>
        )}
      </Box>
    </Container>
  );
}
