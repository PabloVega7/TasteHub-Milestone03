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
                            letterSpacing: "-0.02em",
                        }}></Typography>

                    {/* Navigation Buttons */}
                    <Button 
                        color='inherit' 
                        component={Link} 
                        to='/'
                        sx={{ color: 'rgba(16, 16, 126, 1)' }}>
                        Home
                    </Button>

                    <Button 
                        color='inherit' 
                        component={Link} 
                        to='/my-recipes'
                        sx={{ color: 'rgba(16, 16, 126, 1)' }}>
                        My Recipes
                    </Button>

                    <Button 
                        color='inherit' 
                        component={Link} 
                        to='/add-recipe'
                        sx={{ color: 'rgba(16, 16, 126, 1)' }}>
                        Add Recipe
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
