import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();

  const recipeId = String(id);

  // 1) Try context first
  let recipe = recipes.find((r) => String(r.id) === recipeId) || null;

  // 2) Fallback: LocalStorage
  if (!recipe) {
    try {
      const stored = JSON.parse(
        localStorage.getItem("tastehub-recipes") || "[]"
      );
      recipe = stored.find((r) => String(r.id) === recipeId) || null;
    } catch (error) {
      recipe = null;
    }
  }

  // 3) If nothing found — show fallback
  if (!recipe) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Recipe Details
        </Typography>

        <Typography variant="body1" mb={3}>
          We couldn’t find this recipe. It may have been deleted or the link is
          invalid.
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

  // Handle ingredients/instructions formats
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Recipe Details
      </Typography>

      <Typography variant="h5" fontWeight={600} mb={2}>
        {title}
      </Typography>

      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 2,
            mb: 3,
            objectFit: "cover",
          }}
        />
      )}

      <Typography variant="h6" fontWeight={600} mt={3}>
        Ingredients
      </Typography>
      <ul>
        {ingredientLines.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Typography variant="h6" fontWeight={600} mt={3}>
        Instructions
      </Typography>
      <ol>
        {instructionLines.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </Container>
  );
}
