import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import MyRecipes from "./pages/MyRecipes";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
