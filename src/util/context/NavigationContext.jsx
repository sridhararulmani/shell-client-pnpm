import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_URL } from "../constant/AppUrlConstant";
import { useCallback } from "react";

const NavigationContext = createContext();

const NavigationProvaider = ({ children }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  const pushPath = (path) => {
    setHistory((prev) => (prev.includes(path) ? prev : [...prev, path]));
  };

  const navPrevPath = useCallback(() => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const newHistory = [...prev];
        newHistory.pop();
        const navPath = newHistory[newHistory.length - 1];
        if (navPath == HOME_PAGE_URL) {
          setHistory([]);
        }
        navigate(navPath);
        return newHistory;
      } else {
        navigate(HOME_PAGE_URL);
        return HOME_PAGE_URL;
      }
      return prev;
    });
  }, []);

  return (
    <NavigationContext.Provider value={{ pushPath, navPrevPath }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvaider;

export const useNavigationHistory = () => useContext(NavigationContext);
