import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function RecipeCard({ id, title, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${id}`);
  };

  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 2, cursor: "pointer" }}
      onClick={handleClick}>
      <CardMedia component="img" height="180" image={image} alt={title} />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="600">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
