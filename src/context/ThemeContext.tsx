import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'minimal' | 'nebula';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('minimal');

  useEffect(() => {
    // Add theme class to body for global styling
    const root = window.document.documentElement;
    root.classList.remove('minimal', 'theme-nebula');
    if (theme === 'nebula') {
      root.classList.add('theme-nebula');
    } else {
      root.classList.add('minimal');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'minimal' ? 'nebula' : 'minimal'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
