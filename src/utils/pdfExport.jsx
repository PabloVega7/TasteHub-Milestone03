// src/utils/pdfExport.jsx
import { pdf, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6366f1",
  },
  image: {
    width: "100%",
    maxHeight: 200,
    marginBottom: 20,
    borderRadius: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  listItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  orderedListItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

// Create PDF document component
const RecipePDF = ({ recipe }) => {
  const { title, image, ingredients, instructions } = recipe;

  const ingredientLines = (ingredients || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const instructionLines = (instructions || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        {image && (
          <Image 
            src={image} 
            style={styles.image}
            cache={false}
          />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredientLines.length > 0 ? (
            ingredientLines.map((line, index) => (
              <Text key={index} style={[styles.listItem, styles.text]}>
                • {line}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No ingredients listed.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {instructionLines.length > 0 ? (
            instructionLines.map((line, index) => (
              <Text key={index} style={[styles.orderedListItem, styles.text]}>
                {index + 1}. {line}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No instructions provided.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

// Export function to generate and download PDF
export const generateRecipePDF = async (recipe) => {
  try {
    const doc = <RecipePDF recipe={recipe} />;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${recipe.title.replace(/[^a-z0-9]/gi, "_")}_recipe.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

