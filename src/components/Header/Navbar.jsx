import "./Navbar.min.css";
import "../../App.min.css";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../util/config/AxiosConfig";

import getFileIntoBase64 from "../../util/config/GetFileIntoBase64";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  appAuthMenu,
  appUnAuthMenu,
  profileMenu,
  settingsMenu,
} from "../../util/constant/AppMenu";
import AppConstant from "../../util/constant/AppConstant";
import { MenuRounded } from "@mui/icons-material";
import {
  AppMUIIconButton,
  AppMUIListItemButtonWithIcon,
  AppMUIPopover,
  commonNavBarStyleColors,
  commonNavBarWithoutBlurStyleColors,
} from "../../util/mui/MUIUtils";
import { useCallback } from "react";
import { ACCESS_TOKEN, AppThemes, dataAosOnce } from "../../util/AppUtils";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userProfile, setUserProfile] = useState();

  const { AppButton, AppName, AppUserProfileAvatar } = AppConstant();

  let user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoggedIn(getAccessToken() != null ? true : false);
  }, [localStorage.getItem(ACCESS_TOKEN)]);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverCick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClickingOutside = useCallback((event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleProfileMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleHamburger = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);

  useEffect(() => {
    if (anchorEl && !document.body.contains(anchorEl)) {
      setAnchorEl(null);
    }
  }, [anchorEl]);

  useEffect(() => {
    setUserProfile(() =>
      user != null
        ? getFileIntoBase64(user.profileImage, user.profileImageType)
        : ""
    );
  }, [user]);

  useEffect(() => {
    document.addEventListener("click", handleClickingOutside);
    return () => {
      document.removeEventListener("click", handleClickingOutside);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      className="shadow-sm"
      data-aos="slide-down"
      data-aos-once="true"
      sx={{
        ...commonNavBarStyleColors,
      }}
    >
      <Toolbar className="container flex justify-between item-center">
        <Box className="navbar-brand">
          <a
            href="/"
            className="navbar-brand"
            data-aos="fade"
            data-aos-once="true"
            tabIndex="-1"
          >
            <AppName />
          </a>
        </Box>
        {/* Menu */}
        <Box className="flex gap-2">
          {!isLoggedIn ? (
            <>
              <Box className="hidden lg:block xl:block menu" data-aos="fade">
                <div className="menu-items gap-4" ref={menuRef}>
                  <div className={`auth-menu shadow-sm ${isOpen && "active"}`}>
                    <div
                      className="auth-menu-items gap-1"
                      data-aos-delay="100"
                      data-aos-once="true"
                      data-aos="slide-left"
                    >
                      {appAuthMenu.map((menu, index) => {
                        return (
                          <li className="auth-menu-item" key={menu.id || index}>
                            <AppButton
                              className={"auth-menu-btn fw-bold"}
                              path={menu.url}
                              startIcon={menu.startIcon}
                              text={menu.title}
                            ></AppButton>
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Box>
              <Box className="flex item-center justify-center">
                <div className={`menu-details ${isOpen && "d-none"}`}>
                  <AppUserProfileAvatar
                    userProfile={userProfile}
                    altText={user.userName}
                    onClickFn={handlePopoverCick}
                    dataAosDelay="900"
                    dataAosOnce="true"
                  />
                  <AppMUIPopover
                    anchorEl={anchorEl}
                    onCloseFn={handleClosePopover}
                    onClickFn={handleProfileMenuClose}
                    buttonList={{ content: profileMenu }}
                  />
                </div>
              </Box>
              <Box
                className="block lg:hidden xl:hidden flex item-center justify-center"
                ref={toggleRef}
                display={isOpen && "none"}
              >
                <AppMUIIconButton
                  clickFun={handleHamburger}
                  icon={<MenuRounded />}
                />
              </Box>
            </>
          ) : (
            <Box>
              <div className="flex gap-1">
                {appUnAuthMenu?.map((menu, index) => {
                  return (
                    <li key={menu.id || index} className="unAuth-menu">
                      <AppButton
                        className="unAuth-menu-btn"
                        path={menu.url}
                        icon={menu.icon}
                        text={menu.title}
                      ></AppButton>
                    </li>
                  );
                })}
              </div>
            </Box>
          )}
        </Box>
      </Toolbar>
      <Drawer
        variant="temporary"
        className="block lg:hidden xl:hidden"
        PaperProps={{
          sx: { ...commonNavBarWithoutBlurStyleColors },
        }}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: true,
        }}
        anchor="right"
        open={isOpen}
      >
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
          data-aos="slide-left"
          data-aos-once={dataAosOnce}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 2,
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <ListItemButton>
              <ListItemText
                className="text-wrap"
                primary={
                  <Typography
                    className="text-wrap text-center"
                    fontSize={"small"}
                  >
                    {user.userName || "User Name"}
                  </Typography>
                }
                sx={{
                  width: "60px",
                }}
              ></ListItemText>
              <AppUserProfileAvatar
                userProfile={userProfile}
                altText={user.userName}
                dataAos={"zoom-in"}
              />
            </ListItemButton>
          </Box>
          <Box className="flex flex-col p-2">
            <List className="flex flex-col item-center justify-center">
              {appAuthMenu.map((menu, index) => {
                return (
                  <ListItem className="auth-menu-item" key={menu.id || index}>
                    <AppButton
                      className={"auth-menu-btn fw-bold"}
                      path={menu.url}
                      startIcon={menu.startIcon}
                      text={menu.title}
                      onClick={handleHamburger}
                    ></AppButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box
            sx={{
              mt: "auto",
              position: "sticky",
              bottom: 0,
              zIndex: 1,
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <List>
              <AppMUIListItemButtonWithIcon buttonList={settingsMenu} />
            </List>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
