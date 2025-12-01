// src/pages/RecipeDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Stack,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRecipes } from "../context/RecipesContext";
import { generateRecipePDF } from "../utils/pdfExport";

const STORAGE_KEY = "tastehub-recipes";

export default function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { recipes, deleteRecipe } = useRecipes();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [webRecipe, setWebRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check if this is a web recipe
    const isWebRecipe = location.pathname.includes("/recipe/web/");

    // Fetch web recipe from TheMealDB API
    useEffect(() => {
        if (isWebRecipe && id) {
            setLoading(true);
            setError(null);
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.meals && data.meals.length > 0) {
                        const meal = data.meals[0];

                        // Parse ingredients and measurements
                        const ingredients = [];
                        for (let i = 1; i <= 20; i++) {
                            const ingredient = meal[`strIngredient${i}`];
                            const measure = meal[`strMeasure${i}`];
                            if (ingredient && ingredient.trim()) {
                                ingredients.push(
                                    measure && measure.trim()
                                        ? `${measure.trim()} ${ingredient.trim()}`
                                        : ingredient.trim()
                                );
                            }
                        }

                        // Parse instructions (split by newlines or periods)
                        const instructions = meal.strInstructions
                            ? meal.strInstructions
                                  .split(/\r\n|\n|\. /)
                                  .map((line) => line.trim())
                                  .filter((line) => line.length > 0)
                            : [];

                        setWebRecipe({
                            id: meal.idMeal,
                            title: meal.strMeal,
                            image: meal.strMealThumb,
                            ingredients: ingredients.join("\n"),
                            instructions: instructions.join("\n"),
                            category: meal.strCategory,
                            area: meal.strArea,
                            source: meal.strSource,
                            youtube: meal.strYoutube,
                        });
                    } else {
                        setError("Recipe not found");
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching recipe:", err);
                    setError("Failed to load recipe");
                    setLoading(false);
                });
        }
    }, [isWebRecipe, id]);

    // If context is empty (edge case) fall back to localStorage
    let allRecipes = recipes;
    if (!allRecipes || allRecipes.length === 0) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                allRecipes = JSON.parse(stored);
            }
        } catch (e) {
            console.error("Error reading recipes from localStorage", e);
            allRecipes = [];
        }
    }

    const localRecipe = allRecipes?.find((r) => String(r.id) === String(id)) || null;
    const recipe = isWebRecipe ? webRecipe : localRecipe;

    if (loading) {
        return (
            <Container maxWidth='md' sx={{ mt: 4, textAlign: "center" }}>
                <CircularProgress sx={{ mt: 4 }} />
                <Typography variant='body1' sx={{ mt: 2 }}>
                    Loading recipe...
                </Typography>
            </Container>
        );
    }

    if (error || !recipe) {
        return (
            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Typography variant='h5' fontWeight={700} mb={2}>
                    Recipe not found
                </Typography>
                <Typography variant='body1' mb={3}>
                    {error ||
                        "We couldn't find this recipe. It might have been deleted or the link is invalid."}
                </Typography>
                <Button variant='contained' sx={{ mr: 2 }} onClick={() => navigate("/")}>
                    Back to Home
                </Button>
                {!isWebRecipe && (
                    <Button variant='outlined' onClick={() => navigate("/my-recipes")}>
                        Go to My Recipes
                    </Button>
                )}
            </Container>
        );
    }

    const { title, image, ingredients, instructions } = recipe;

    const ingredientLines = (ingredients || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const instructionLines = (instructions || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const handleDelete = () => {
        deleteRecipe(id);
        navigate("/my-recipes");
    };

    const handleShare = async () => {
        const recipeUrl = `${window.location.origin}${
            isWebRecipe ? `/recipe/web/${id}` : `/recipe/${id}`
        }`;
        const shareData = {
            title: `${recipe.title} - Recipe`,
            text: `Check out this recipe: ${recipe.title}`,
            url: recipeUrl,
        };

        // Try Web Share API first (works on mobile and some desktop browsers)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled or error occurred
                if (err.name !== "AbortError") {
                    console.error("Error sharing:", err);
                }
            }
        } else {
            // Fallback: Copy link to clipboard
            try {
                await navigator.clipboard.writeText(recipeUrl);
                setSnackbarMessage("Recipe link copied to clipboard!");
                setSnackbarOpen(true);
            } catch (err) {
                console.error("Failed to copy:", err);
                setSnackbarMessage("Failed to copy link. Please copy manually.");
                setSnackbarOpen(true);
            }
        }
    };

    const handleExportPDF = async () => {
        try {
            await generateRecipePDF(recipe);
            setSnackbarMessage("PDF downloaded successfully!");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error generating PDF:", error);
            setSnackbarMessage("Failed to generate PDF. Please try again.");
            setSnackbarOpen(true);
        }
    };

    return (
        <Container maxWidth='md' sx={{ mt: 4, mb: 6 }}>
            <Typography variant='h1' fontWeight={700} mb={3}>
                {title}
            </Typography>

            {image && (
                <Box
                    component='img'
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
                <Typography variant='h6' fontWeight={600} mb={1}>
                    Ingredients
                </Typography>
                {ingredientLines.length ? (
                    <ul>
                        {ingredientLines.map((line, index) => (
                            <li key={index}>
                                <Typography variant='body1'>{line}</Typography>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Typography variant='body2' color='text.secondary'>
                        No ingredients listed.
                    </Typography>
                )}
            </Box>

            <Box mb={4}>
                <Typography variant='h6' fontWeight={600} mb={1}>
                    Instructions
                </Typography>
                {instructionLines.length ? (
                    <ol>
                        {instructionLines.map((line, index) => (
                            <li key={index}>
                                <Typography variant='body1'>{line}</Typography>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <Typography variant='body2' color='text.secondary'>
                        No instructions provided.
                    </Typography>
                )}
            </Box>

            {recipe.category && (
                <Box mb={2}>
                    <Typography variant='body2' color='text.secondary'>
                        {recipe.category} {recipe.area && `• ${recipe.area}`}
                    </Typography>
                </Box>
            )}

            <Stack direction='row' spacing={2} sx={{ mt: 2 }} flexWrap='wrap'>
                {!isWebRecipe && (
                    <>
                        <Button variant='outlined' onClick={() => navigate(`/edit-recipe/${id}`)}>
                            Edit Recipe
                        </Button>
                        <Button variant='outlined' onClick={() => navigate("/my-recipes")}>
                            Back to My Recipes
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => setDeleteDialogOpen(true)}>
                            Delete Recipe
                        </Button>
                    </>
                )}
                {isWebRecipe && (
                    <Button variant='outlined' onClick={() => navigate("/")}>
                        Back to Home
                    </Button>
                )}
                <Button variant='share' startIcon={<ShareIcon />} onClick={handleShare}>
                    Share
                </Button>
                <Button
                    variant='download'
                    color='primary'
                    startIcon={<PictureAsPdfIcon />}
                    onClick={handleExportPDF}>
                    Download PDF
                </Button>
            </Stack>

            {!isWebRecipe && (
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Delete Recipe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete &quot;{title}&quot;? This action cannot
                            be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleDelete} color='error' variant='contained'>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity='success'
                    sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
