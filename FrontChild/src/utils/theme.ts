import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#FFFFFF",
      main: "#344767",
    },
    secondary: {
      contrastText: "#FFFFFF",
      main: "#960D0D",
    },
    tertiary: {
      contrastText: "#FFFFFF",
      main: "rgba(58,65,111,.5)",
    },
    surface: {
      contrastText: "#FFFFFF",
      main: "#F7F7F7",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

