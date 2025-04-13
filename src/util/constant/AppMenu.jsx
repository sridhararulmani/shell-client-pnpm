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
import { AppMenuData } from "./AppMenuData";
import { AppButtonData } from "./AppButtonData";

export const appAuthMenu = [
  new AppMenuData(1, "Home", <HomeIcon />, HOME_PAGE_URL),
  new AppMenuData(2, "Shop", <ShopIcon />, SHOP_PAGE_URL),
  new AppMenuData(3, "About", <AboutIcon />, ABOUT_PAGE_URL),
];

export const appUnAuthMenu = [
  new AppMenuData(1, "Sign In", <SignInIcon />, SIGN_IN_PAGE_URL),
  new AppMenuData(2, "Sign Up", <SignUpIcon />, SIGN_UP_PAGE_URL),
];

export const profileMenu = [
  new AppButtonData(1, null, <Settings />, "Settings", HOME_PAGE_URL, null),
  new AppButtonData(2, null, <AboutIcon />, "About", ABOUT_PAGE_URL, null),
  new AppButtonData(
    3,
    null,
    <SignOutIcon />,
    "Sign Out",
    SIGN_OUT_PAGE_URL,
    null
  ),
];

export const settingsMenu = [
  new AppButtonData(
    1,
    null,
    <SignOutIcon />,
    "Sign Out",
    SIGN_OUT_PAGE_URL,
    null
  ),
];
