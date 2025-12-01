import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

export default function WebRecipes() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
        );
        const data = await res.json();

        if (data.meals) {
          setResults(
            data.meals.slice(0, 6).map((meal) => ({
              id: meal.idMeal,
              title: meal.strMeal,
              image: meal.strMealThumb,
            }))
          );
        }
      } catch (err) {
        console.error("API error", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {results.map((r) => (
        <RecipeCard key={r.id} id={r.id} title={r.title} image={r.image} />
      ))}
    </div>
  );
}
