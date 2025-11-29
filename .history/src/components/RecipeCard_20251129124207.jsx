import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function RecipeCard({ title, image }) {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 2, borderRadius: 2 }}>
      <CardActionArea>
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
