// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from '@/theme/CustomTheme'; // Import your custom theme

const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  // Detect system theme
  const getInitialMode = () => {
    // Check local storage for theme mode
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) return savedMode;

    // Detect system preference
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };

  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    // Sync theme mode with local storage
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = customTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ mode, toggleColorMode }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
