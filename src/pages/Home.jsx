import { useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import WebRecipes from "../components/WebRecipes";
import { useRecipes } from "../context/RecipesContext";

export default function Home() {
    const { recipes } = useRecipes();
    const [search, setSearch] = useState("");

    const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 6 }}>
            <Typography variant='h1' fontWeight={700} mb={3}>
                Search Recipes
            </Typography>

            <TextField
                fullWidth
                label='Search for recipes...'
                variant='outlined'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 4, backgroundColor: "white" }}
            />

            {search.trim() ? (
                <>
                    <Typography variant='h6' fontWeight={600} mb={2}>
                        My Recipes ({filtered.length})
                    </Typography>
                    <Grid container spacing={3} mb={4}>
                        {filtered.map((recipe) => (
                            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                                <RecipeCard
                                    id={recipe.id}
                                    title={recipe.title}
                                    image={recipe.image}
                                />
                            </Grid>
                        ))}
                        {filtered.length === 0 && (
                            <Typography
                                variant='body2'
                                color='text.secondary'
                                sx={{ ml: 2, mt: 1 }}>
                                No matching recipes in your collection.
                            </Typography>
                        )}
                    </Grid>

                    <Typography variant='h6' fontWeight={600} mb={2}>
                        Recipes from the Web
                    </Typography>
                    <WebRecipes searchTerm={search} />
                </>
            ) : (
                <>
                    <Typography variant='h6' fontWeight={600} mb={2}>
                        My Recipes
                    </Typography>
                    <Grid container spacing={3} mb={4}>
                        {recipes.map((recipe) => (
                            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                                <RecipeCard
                                    id={recipe.id}
                                    title={recipe.title}
                                    image={recipe.image}
                                />
                            </Grid>
                        ))}
                        {recipes.length === 0 && (
                            <Typography
                                variant='body2'
                                color='text.secondary'
                                sx={{ ml: 2, mt: 1 }}>
                                You don&apos;t have any recipes yet.
                            </Typography>
                        )}
                    </Grid>

                    <Typography variant='h6' fontWeight={600} mb={2}>
                        Popular Recipes from the Web
                    </Typography>
                    <WebRecipes searchTerm='' />
                </>
            )}
        </Container>
    );
}
