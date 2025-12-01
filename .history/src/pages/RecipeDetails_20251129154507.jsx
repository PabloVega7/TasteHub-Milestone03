import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // 1. Try context first
    let found = recipes.find((r) => r.id === id);

    if (!found) {
      // 2. Try localStorage
      try {
        const stored =
          JSON.parse(localStorage.getItem("tastehub-recipes")) || [];
        found = stored.find((r) => r.id === id);
      } catch (err) {
        found = null;
      }
    }

    setRecipe(found);
  }, [id, recipes]);

  if (!recipe) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate("/")}>Back Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "300px", borderRadius: "8px" }}
      />

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.split("\n").map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ul>
        {recipe.instructions.split("\n").map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
