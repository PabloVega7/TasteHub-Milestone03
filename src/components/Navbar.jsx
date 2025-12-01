import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position='static' mbz>
                <Toolbar>
                    {/* Logo / App Name */}
                    <img
                        src='/src/assets/Logo.png'
                        alt='TasteHub Logo'
                        style={{ height: 60, marginRight: 10 }}
                    />
                    <Typography
                        component='div'
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            letterSpacing: "0.02em",
                            fontFamily: "Retrograde",
                            fontSize: "1.5rem",
                        }}>
                        Mealio
                    </Typography>

                    {/* Navigation Buttons */}
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>

                    <Button color='inherit' component={Link} to='/my-recipes'>
                        My Recipes
                    </Button>

                    <Button color='inherit' component={Link} to='/add-recipe'>
                        Add Recipe
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
