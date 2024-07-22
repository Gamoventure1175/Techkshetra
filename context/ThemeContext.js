import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from '@/theme/CustomTheme'; // Import your custom theme

const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const [mode, setMode] = useState('light'); // Default value before checking localStorage
  const [isLoaded, setIsLoaded] = useState(false); // Track when theme is loaded

  useEffect(() => {
    // This code runs only on the client side
    const savedMode = localStorage.getItem('themeMode');

    if (savedMode) {
      setMode(savedMode);
    } else {
      // Detect system preference
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(userPrefersDark ? 'dark' : 'light');
    }
    
    // Mark theme as loaded
    setIsLoaded(true);
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // This code runs only on the client side
    if (isLoaded) {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode, isLoaded]);

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
