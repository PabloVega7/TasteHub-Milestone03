import { Container, TextField, Typography, Button, Box } from "@mui/material";

export default function EditRecipe() {
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Edit Recipe
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
        <TextField
          label="Recipe Title"
          defaultValue="Spaghetti Carbonara"
          variant="outlined"
          required
        />

        <TextField
          label="Image URL"
          defaultValue="https://via.placeholder.com/300"
          variant="outlined"
        />

        <TextField
          label="Short Description"
          defaultValue="Classic Italian pasta with eggs, cheese, pancetta and pepper."
          variant="outlined"
          multiline
          minRows={2}
        />

        <TextField
          label="Ingredients"
          defaultValue={"200g spaghetti\n2 eggs\n50g pancetta\nParmesan cheese"}
          variant="outlined"
          multiline
          minRows={4}
        />

        <TextField
          label="Instructions"
          defaultValue="Boil pasta, cook pancetta, mix eggs & cheese, combine off heat."
          variant="outlined"
          multiline
          minRows={5}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary">
            Update Recipe
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
