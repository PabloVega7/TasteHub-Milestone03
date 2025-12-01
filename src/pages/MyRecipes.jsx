// src/pages/MyRecipes.jsx
import { useState } from "react";
import { Container, Grid, Typography, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipes() {
    const { recipes } = useRecipes();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 6 }}>
            <Typography variant='h4' fontWeight={700} mb={3}>
                My Recipes
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <Button variant='recipe' onClick={() => navigate("/add-recipe")}>
                    Add New Recipe
                </Button>
            </Box>

            <TextField
                fullWidth
                label='Search your recipes...'
                variant='outlined'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3, backgroundColor: "white" }}
            />

            {search.trim() && (
                <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                    Found {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
                </Typography>
            )}

            <Grid container spacing={3}>
                {filtered.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        <RecipeCard id={recipe.id} title={recipe.title} image={recipe.image} />
                    </Grid>
                ))}
                {filtered.length === 0 && (
                    <Typography variant='body2' color='text.secondary' sx={{ ml: 2 }}>
                        {search.trim()
                            ? "No recipes match your search."
                            : "You don't have any recipes yet."}
                    </Typography>
                )}
            </Grid>
        </Container>
    );
}
