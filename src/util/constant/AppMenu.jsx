import {
  ABOUT_PAGE_URL,
  HOME_PAGE_URL,
  SHOP_PAGE_URL,
  SIGN_IN_PAGE_URL,
  SIGN_OUT_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from "./AppUrlConstant";

import HomeIcon from "@mui/icons-material/Home";
import ShopIcon from "@mui/icons-material/Storefront";
import AboutIcon from "@mui/icons-material/Person2Rounded";
import SignInIcon from "@mui/icons-material/LoginRounded";
import SignUpIcon from "@mui/icons-material/PersonAdd";
import SignOutIcon from "@mui/icons-material/LogoutRounded";
import Settings from "@mui/icons-material/Settings";

export const appAuthMenu = [
  {
    id: 1,
    title: "Home",
    icon: <HomeIcon />,
    url: HOME_PAGE_URL,
  },
  { id: 2, title: "Shop", icon: <ShopIcon />, url: SHOP_PAGE_URL },
  { id: 3, title: "About", icon: <AboutIcon />, url: ABOUT_PAGE_URL },
  { id: 4, title: "Sign Out", icon: <SignOutIcon />, url: SIGN_OUT_PAGE_URL },
];

export const appUnAuthMenu = [
  { id: 1, title: "Sign In", icon: <SignInIcon />, url: SIGN_IN_PAGE_URL },
  { id: 2, title: "Sign Up", icon: <SignUpIcon />, url: SIGN_UP_PAGE_URL },
];

export const profileMenu = [
  { id: 1, title: "Settings", icon: <Settings />, url: HOME_PAGE_URL },
  { id: 3, title: "About", icon: <AboutIcon />, url: ABOUT_PAGE_URL },
];
