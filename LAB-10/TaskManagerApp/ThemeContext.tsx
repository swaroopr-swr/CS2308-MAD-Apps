import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeColors = {
  background: string;
  card: string;
  border: string;
  tint: string;
  textSecondary: string;
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightColors: ThemeColors = {
  background: '#F0F0F8',
  card: '#FFFFFF',
  border: '#E2E8F0',
  tint: '#A3E635',
  textSecondary: '#64748B',
};

const darkColors: ThemeColors = {
  background: '#0F0F1A',
  card: '#1A1A2E',
  border: 'rgba(255,255,255,0.1)',
  tint: '#A3E635',
  textSecondary: 'rgba(255,255,255,0.45)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
