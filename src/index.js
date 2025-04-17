import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as serviceWorker from './registerServiceWorker';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
serviceWorker.register({
  onUpdate: registration => {
    if (window.confirm('Доступна новая версия приложения. Обновить?')) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
});
 const container = document.getElementById('root');
 const root = createRoot(container);
 root.render(
   <React.StrictMode>
     <ThemeProvider theme={theme}>
       <CssBaseline />
       <App />
     </ThemeProvider>
   </React.StrictMode>
);

