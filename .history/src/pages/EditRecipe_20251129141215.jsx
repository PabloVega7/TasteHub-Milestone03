// src/pages/EditRecipe.jsx
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";

export default function EditRecipe() {
  const { id } = useParams();
  const { getRecipeById, updateRecipe } = useRecipes();
  const navigate = useNavigate();

  const recipe = getRecipeById(id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");

  // Pre-fill form when recipe is loaded
  useEffect(() => {
    if (!recipe) return;

    setTitle(recipe.title || "");
    setImage(recipe.image || "");
    setShortDescription(recipe.shortDescription || "");

    const ingredientsValue = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join("\n")
      : recipe.ingredients || "";

    const instructionsValue = Array.isArray(recipe.instructions)
      ? recipe.instructions.join("\n")
      : recipe.instructions || "";

    setIngredientsText(ingredientsValue);
    setInstructionsText(instructionsValue);
  }, [recipe]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a recipe title.");
      return;
    }

    updateRecipe(id, {
      title: title.trim(),
      image: image.trim(),
      shortDescription: shortDescription.trim(),
      ingredients: ingredientsText,
      instructions: instructionsText,
    });

    navigate(`/recipe/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Edit Recipe
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <TextField
          label="Short Description"
          fullWidth
          multiline
          minRows={2}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />

        <TextField
          label="Ingredients (one per line)"
          fullWidth
          multiline
          minRows={4}
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
        />

        <TextField
          label="Instructions (one step per line)"
          fullWidth
          multiline
          minRows={6}
          value={instructionsText}
          onChange={(e) => setInstructionsText(e.target.value)}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Update Recipe
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
