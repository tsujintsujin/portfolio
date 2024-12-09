// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context to hold the light/dark mode state
const ThemeContext = createContext();

// Create a Provider component
export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(false);

  // Function to toggle the light mode
  const lightModeToggle = () => {
    setIsLightMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, lightModeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily access the context
export const useTheme = () => useContext(ThemeContext);
