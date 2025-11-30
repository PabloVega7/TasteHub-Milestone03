// src/pages/RecipeDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();

  const recipe = recipes.find((r) => String(r.id) === String(id));

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
            No instructions provided yet.
          </Typography>
        )}
      </Box>

      <Button variant="outlined" onClick={() => navigate("/my-recipes")}>
        Back to My Recipes
      </Button>
    </Container>
  );
}
