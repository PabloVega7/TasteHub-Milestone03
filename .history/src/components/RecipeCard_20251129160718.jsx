// src/components/RecipeCard.jsx
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ id, title, image, externalUrl }) {
  const navigate = useNavigate();

  // Web recipe → external URL in a new tab
  if (externalUrl) {
    return (
      <Card sx={{ maxWidth: 345, boxShadow: 2, borderRadius: 2 }}>
        <CardActionArea
          component="a"
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer">
          <CardMedia
            component="img"
            height="180"
            image={image}
            alt={title}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              fontWeight={600}>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  // Your recipe → go to /recipes/:id
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 2, borderRadius: 2 }}>
      <CardActionArea onClick={() => navigate(`/recipes/${id}`)}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            fontWeight={600}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
