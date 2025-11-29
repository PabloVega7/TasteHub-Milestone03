import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar>
          {/* Logo / App Name */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}>
            TasteHub
          </Typography>

          {/* Navigation Buttons */}
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/my-recipes">
            My Recipes
          </Button>

          <Button color="inherit" component={Link} to="/add-recipe">
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
