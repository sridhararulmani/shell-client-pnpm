import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const getPreferedTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored && stored !== 'default') {
      return stored;
    }
    const systemPreferredTheme = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    return systemPreferredTheme ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getPreferedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");
    const handleChange = (e) => {      
      const stored = localStorage.getItem("theme");
      if (!stored) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.addEventListener("change", handleChange);

  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
