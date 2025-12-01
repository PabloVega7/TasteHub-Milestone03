// src/components/RecipeCard.jsx
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ id, title, image, externalUrl, isWebRecipe }) {
    const navigate = useNavigate();

    // Web recipe → navigate to details page (not external URL)
    if (isWebRecipe || externalUrl) {
        return (
            <Card sx={{ maxWidth: 345, borderRadius: 2 }}>
                <CardActionArea onClick={() => navigate(`/recipe/web/${id}`)}>
                    <CardMedia
                        component='img'
                        height='180'
                        image={image}
                        alt={title}
                        sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant='subtitle1'
                            component='div'
                            fontWeight={600}>
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    // Your recipe → go to /recipe/:id
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2 }}>
            <CardActionArea onClick={() => navigate(`/recipe/${id}`)}>
                <CardMedia
                    component='img'
                    height='180'
                    image={image}
                    alt={title}
                    sx={{ objectFit: "cover" }}
                />
                <CardContent>
                    <Typography gutterBottom variant='subtitle1' component='div' fontWeight={400}>
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
