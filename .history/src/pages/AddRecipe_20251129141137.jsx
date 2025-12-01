// src/pages/AddRecipe.jsx
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";

export default function AddRecipe() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a recipe title.");
      return;
    }

    const newId = addRecipe({
      title: title.trim(),
      image: image.trim(),
      shortDescription: shortDescription.trim(),
      // store as raw text; details page knows how to split it into lists
      ingredients: ingredientsText,
      instructions: instructionsText,
    });

    navigate(`/recipe/${newId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Add Recipe
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
          helperText="Paste a link to an image of the dish (optional)"
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
            Save Recipe
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
