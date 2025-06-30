import Routes from './Routes.jsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './utils/theme.js'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default App
