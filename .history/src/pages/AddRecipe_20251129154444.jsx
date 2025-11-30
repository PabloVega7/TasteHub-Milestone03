import { useState } from "react";
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

    addRecipe({
      title,
      image,
      ingredients,
      instructions,
    });

    navigate("/my-recipes");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Add Recipe</h2>

      <input
        style={{ display: "block", marginBottom: "1rem" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <input
        style={{ display: "block", marginBottom: "1rem" }}
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        required
      />

      <textarea
        style={{ display: "block", marginBottom: "1rem" }}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (one per line)"
        required
      />

      <textarea
        style={{ display: "block", marginBottom: "1rem" }}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions (one per line)"
        required
      />

      <button type="submit">Save Recipe</button>
    </form>
  );
}
