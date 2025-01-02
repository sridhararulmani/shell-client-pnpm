import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitile = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Shell | Welcome to Shell";
        break;
      case "/login":
        document.title = "Shell | Account Login";
        break;
      case "/logout":
        document.title = "Shell | Account Logout";
        break;
      case "/register":
        document.title = "Shell | Account Register";
        break;
      case "/home":
        document.title = "Shell | Home";
        break;
      case "/about":
        document.title = "Shell | About Shell";
        break;
      case "/shop":
        document.title = "Shell | Shoping";
        break;
    }
  });
};

export default PageTitile;
