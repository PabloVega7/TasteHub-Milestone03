import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";

export default function AddRecipe() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // send data to context, get back the id we generated there
    const newId = addRecipe({
      title: title.trim(),
      image: image.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
    });

    // go to /recipes/:id using that id
    navigate(`/recipes/${newId}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Add Recipe
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Ingredients (one per line)"
          fullWidth
          multiline
          minRows={4}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Instructions (one step per line)"
          fullWidth
          multiline
          minRows={4}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained">
          Save Recipe
        </Button>
      </Box>
    </Container>
  );
}
