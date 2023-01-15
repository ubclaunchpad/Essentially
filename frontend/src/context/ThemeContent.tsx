import React, { useState } from 'react';

interface ThemeContextInterface {
  theme: string;
  updateTheme(newTheme: string): void;
}

export const ThemeContent = React.createContext<ThemeContextInterface>({
  theme: 'Dark',
  updateTheme: () => {
    return;
  },
});

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState('Light');

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContent.Provider value={{ theme: theme, updateTheme: updateTheme }}>
      {children}
    </ThemeContent.Provider>
  );
}
