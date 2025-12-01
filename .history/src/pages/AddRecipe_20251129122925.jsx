import { Container, TextField, Typography, Button, Box } from "@mui/material";

export default function AddRecipe() {
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Add New Recipe
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 600,
        }}>
        <TextField label="Recipe Title" variant="outlined" required />

        <TextField
          label="Image URL"
          variant="outlined"
          helperText="Link to a photo of the dish"
        />

        <TextField
          label="Short Description"
          variant="outlined"
          multiline
          minRows={2}
        />

        <TextField
          label="Ingredients"
          variant="outlined"
          multiline
          minRows={4}
          helperText="List ingredients, one per line"
        />

        <TextField
          label="Instructions"
          variant="outlined"
          multiline
          minRows={5}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary">
            Save Recipe
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
