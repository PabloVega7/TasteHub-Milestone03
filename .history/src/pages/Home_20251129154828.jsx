import { useRecipes } from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";
import WebRecipes from "../components/WebRecipes";

export default function Home() {
  const { recipes } = useRecipes();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Search Recipes</h1>

      <h2>My Recipes</h2>
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

      <h2>Recipes from the Web</h2>
      <WebRecipes />
    </div>
  );
}
