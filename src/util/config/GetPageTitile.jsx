import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ABOUT_PAGE_URL,
  HOME_PAGE_URL,
  SHOP_PAGE_URL,
  SIGN_IN_PAGE_URL,
  SIGN_OUT_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from "../constant/AppUrlConstant";
import { useNavigationHistory } from "../context/NavigationContext.jsx";

const PageTitile = () => {
  const location = useLocation();

  const { pushPath } = useNavigationHistory();

  useEffect(() => {
    pushPath(location.pathname);
    switch (location.pathname) {
      case HOME_PAGE_URL:
        document.title = "Shell | Welcome to Shell";
        break;
      case SIGN_IN_PAGE_URL:
        document.title = "Shell | Account Login";
        break;
      case SIGN_OUT_PAGE_URL:
        document.title = "Shell | Account Logout";
        break;
      case SIGN_UP_PAGE_URL:
        document.title = "Shell | Account Register";
        break;
      case ABOUT_PAGE_URL:
        document.title = "Shell | About Shell";
        break;
      case SHOP_PAGE_URL:
        document.title = "Shell | Shoping";
        break;
    }
  }, [location.pathname]);
};

export default PageTitile;
