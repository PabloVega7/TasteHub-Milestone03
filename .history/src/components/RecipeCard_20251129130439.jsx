import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function RecipeCard({ id, title, image }) {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 2, borderRadius: 2 }}>
      <CardActionArea
        component={Link}
        to={`/recipe/${id}`}
        sx={{ textDecoration: "none" }}>
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
