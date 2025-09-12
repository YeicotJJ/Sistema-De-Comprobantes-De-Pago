// src/theme/ThemeProvider.jsx
import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useAppTheme = () => useContext(ThemeContext);

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: 'rgb(70, 124, 240)',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#121212',
      paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? '#5f6368' : '#cccccc',
    },
  },
});

const AppThemeProvider = ({ children }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppThemeProvider;
