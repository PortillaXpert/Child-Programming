import Routes from "./Routes.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme.ts";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
