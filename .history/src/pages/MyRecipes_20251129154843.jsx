import { useRecipes } from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipes() {
  const { recipes } = useRecipes();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Recipes</h1>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
          />
        ))}
      </div>
    </div>
  );
}
