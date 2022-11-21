import React, { useState } from 'react';

interface ThemeContextInterface {
  theme: string;
  updateTheme(newTheme: string): void;
}

const ThemeContent = React.createContext<ThemeContextInterface>({
  theme: 'Dak',
  updateTheme: () => {
    return;
  },
});

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState('s');

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContent.Provider value={{ theme: theme, updateTheme: updateTheme }}>
      {children}
    </ThemeContent.Provider>
  );
}
