import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

export const ColorModeContext = createContext({ changeTheme: () => {} });

const themes = {
  light: {
    name: 'Claro',
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
  },
  dark: {
    name: 'Oscuro',
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#ce93d8',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
  },
  nature: {
    name: 'Naturaleza',
    palette: {
      mode: 'light',
      primary: {
        main: '#2e7d32', // Verde
      },
      secondary: {
        main: '#795548', // Marrón
      },
      background: {
        default: '#f1f8e9',
        paper: '#ffffff',
      },
    },
  },
  ocean: {
    name: 'Océano',
    palette: {
      mode: 'dark',
      primary: {
        main: '#0288d1', // Azul océano
      },
      secondary: {
        main: '#00acc1', // Cyan
      },
      background: {
        default: '#002f6c',
        paper: '#01579b',
      },
    },
  },
};

export const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const colorMode = useMemo(
    () => ({
      changeTheme: (themeName) => {
        setCurrentTheme(themeName);
      },
      currentTheme,
    }),
    [currentTheme],
  );

  const theme = useMemo(
    () => createTheme(themes[currentTheme]),
    [currentTheme],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}; 