import {
  ABOUT_PAGE_URL,
  HOME_PAGE_URL,
  SHOP_PAGE_URL,
  SIGN_IN_PAGE_URL,
  SIGN_OUT_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from "./AppUrlConstant";

export const appAuthMenu = [
  {
    id: 1,
    title: "Home",
    url: HOME_PAGE_URL,
  },
  { id: 2, title: "Shop", url: SHOP_PAGE_URL },
  { id: 3, title: "About", url: ABOUT_PAGE_URL },
  { id: 4, title: "Sign Out", url: SIGN_OUT_PAGE_URL },
];

export const appUnAuthMenu = [
  { id: 1, title: "Sign In", url: SIGN_IN_PAGE_URL },
  { id: 2, title: "Sign Up", url: SIGN_UP_PAGE_URL },
];
