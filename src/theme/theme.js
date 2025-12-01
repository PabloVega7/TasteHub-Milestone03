// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "rgba(16, 16, 126, 1)", // Deep blue
            light: "#87c1f4ff",
            dark: "#28211C",
            contrastText: "rgba(16, 16, 126, 1)",
        },
        background: {
            default: "#F7F3E6", // Cream
            paper: "#F7F3E6",
        },
        text: {
            primary: "#10107dff", // Deep blue
            secondary: "#6b7280", // Medium gray
        },
        error: {
            main: "#ef4444",
        },
        warning: {
            main: "#f59e0b",
        },
        info: {
            main: "#3b82f6",
        },
        success: {
            main: "#10b981",
        },
    },
    typography: {
        fontFamily: [
            "Retrograde",
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
        ].join(","),
        h1: {
            fontWeight: 700,
            fontSize: "2.5rem",
            letterSpacing: "0.03em",
        },
        h2: {
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: "0.03em",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.75rem",
            letterSpacing: "0.03em",
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
            letterSpacing: "0.03em",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.25rem",
            letterSpacing: "0.03em",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.125rem",
            letterSpacing: "0.03em",
        },
        body1: {
            fontFamily: "Inter",
            fontSize: "1rem",
            lineHeight: 1.6,
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.5,
        },
        button: {
            textTransform: "none",
            fontWeight: 500,
            letterSpacing: "0.01em",
            borderColor: "rgba(16, 16, 126, 1)",
            borderWidth: 2,
        },
        subtitle1: {
            fontFamily: "Inter",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 20px",
                    fontWeight: 500,
                    borderColor: "rgba(16, 16, 126, 1)",
                    borderWeight: 2,
                },
                recipe: {
                    borderRadius: 8,
                    backgroundColor: "rgba(16, 16, 126, 1)",
                    padding: "8px 20px",
                    fontWeight: 500,
                    borderColor: "rgba(16, 16, 126, 1)",
                    borderWeight: 2,
                    color: "#ffffff",
                },
                contained: {
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    "&:hover": {
                        boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow:
                        "0 1px 3px 0 rgba(8, 32, 126, 0.72), 0 1px 2px 0 rgba(40, 70, 221, 0.47)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        boxShadow:
                            "0 10px 15px -3px rgba(8, 32, 126, 0.72), 0 4px 6px -2px rgba(40, 70, 221, 0.47)",
                        transform: "translateY(-2px)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "rgba(8, 32, 126, 0.72)",
                    background: "#F7F3E6",
                },
            },
        },
    },
});

export default theme;
