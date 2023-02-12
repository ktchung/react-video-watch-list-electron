import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppContextProvider } from './contexts/AppContext';
import { VideoContextProvider } from './contexts/VideoContext';
import Home from './pages/Home';
import theme from './theme';

function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <VideoContextProvider>
        <AppContextProvider>
          <Home />
        </AppContextProvider>
      </VideoContextProvider>
    </ThemeProvider>
  );
}

export default App;
