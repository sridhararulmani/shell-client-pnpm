import "./Navbar.min.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../util/config/AxiosConfig";

import getFileIntoBase64 from "../../util/config/GetFileIntoBase64";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  appAuthMenu,
  appUnAuthMenu,
  profileMenu,
  settingsMenu,
} from "../../util/constant/AppMenu";
import AppSkeleton from "../../util/skeleton/AppSkeleton";
import AppConstant from "../../util/constant/AppConstant";
import { MenuRounded } from "@mui/icons-material";
import {
  AppMUIIconButton,
  AppMUIListItemButtonWithIcon,
  AppMUIPopover,
} from "../../util/mui/MUIUtils";
import { Settings } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import { Email } from "@mui/icons-material";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userProfile, setUserProfile] = useState();

  const { TextSkeleton } = AppSkeleton();
  const { AppButton, AppName, AppUserProfileAvatar } = AppConstant();

  let user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoggedIn(getAccessToken() != null ? true : false);
  }, [localStorage.getItem("ACCESS_TOKEN")]);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileToggleRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverCick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClickingOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
    // if (
    //   profileMenuRef.current &&
    //   !profileMenuRef.current.contains(event.target) &&
    //   profileToggleRef.current &&
    //   !profileToggleRef.current.contains(event.target)
    // ) {
    //   setIsProfileOpen(false);
    // }
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

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
    // <header
    //   className="navbar navbar-expand-lg w-full navbar-dark bg-dark shadow-sm"
    //   data-aos="slide-down"
    // >
    //   <div className="container mx-auto flex justify-between items-center">
    //     <a
    //       href="/"
    //       className="navbar-brand fs-3 fw-bold"
    //       data-aos="fade"
    //       tabIndex="-1"
    //     >
    //       {/* <i className="fa-brands fa-shopify"></i>Shell. */}
    //       <AppName />
    //     </a>
    //     <div className="menu" data-aos="fade">
    //       {!isLoggedIn ? (
    //         <div className="menu-items gap-4" ref={menuRef}>
    //           <div className={`auth-menu shadow-sm ${isOpen && "active"}`}>
    //             <div className="auth-menu-items" data-aos="slide-left">
    //               {appAuthMenu.map((menu, index) => {
    //                 return (
    //                   <li className="auth-menu-item" key={menu.id || index}>
    //                     <AppButton
    //                       className={"auth-menu-btn fw-bold"}
    //                       path={menu.url}
    //                       icon={menu.icon}
    //                       text={menu.title}
    //                       onClick={() => handleHamburger()}
    //                     ></AppButton>
    //                     {/* <NavLink
    //                       className="auth-menu-btn fw-bold"
    //                       to={menu.url}
    //                       onClick={() => handleHamburger()}
    //                     >
    //                       {menu.title}
    //                     </NavLink> */}
    //                   </li>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //           <div className="menu-details">
    //             <div
    //               className="hamburger-menu"
    //               onClick={handleHamburger}
    //               ref={toggleRef}
    //             >
    //               {!isOpen ? (
    //                 <div className="open-icon">
    //                   <span></span>
    //                   <span></span>
    //                   <span></span>
    //                 </div>
    //               ) : (
    //                 <div className="close-icon">
    //                   <span></span>
    //                   <span></span>
    //                 </div>
    //               )}
    //             </div>
    //             <Box
    //               // className="user-profile-image-container rounded-circle border border-light"
    //               data-aos="flip-right"
    //               data-aos-delay="900"
    //               onClick={handleProfileMenu}
    //               ref={profileToggleRef}
    //               className="flex flex-row-reverse"
    //             >
    //               <span className="absolute flex size-2 z-1">
    //                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
    //                 <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
    //               </span>
    //               <Avatar
    //                 alt="User profile"
    //                 src={userProfile}
    //                 sx={{
    //                   transition: "all 0.5s ease-in-out",
    //                   cursor: "pointer",
    //                 }}
    //               ></Avatar>
    //             </Box>
    //             {isProfileOpen && (
    //               <div
    //                 className="profile-menu p-4 rounded shadow-sm"
    //                 ref={profileMenuRef}
    //               >
    //                 <TextSkeleton
    //                   className="text-wrap"
    //                   text={user.userName}
    //                   delay={500}
    //                 />
    //                 <hr />
    //                 <TextSkeleton
    //                   className="text-wrap"
    //                   text={user.userEmail}
    //                   delay={500}
    //                 />
    //                 <hr />
    //                 <a href="" className="text-white">
    //                   Settings
    //                 </a>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="unAuth-menu">
    //           {appUnAuthMenu?.map((menu, index) => {
    //             return (
    //               <li key={menu.id}>
    //                 <AppButton
    //                   className={"unAuth-menu-btn fw-bold"}
    //                   path={menu.url}
    //                   icon={menu.icon}
    //                   text={menu.title}
    //                 ></AppButton>
    //               </li>
    //               // <NavLink
    //               //   className="unAuth-menu-btn fw-bold rounded-4"
    //               //   key={menu.id || index}
    //               //   to={menu.url}
    //               // >
    //               //   {menu.title}
    //               // </NavLink>
    //             );
    //           })}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </header>
    <AppBar
      position="sticky"
      className="bg-dark shadow-sm"
      data-aos="slide-down"
      data-aos-ince="true"
    >
      <Toolbar className="container flex justify-between item-center">
        <Box>
          <a href="/" className="navbar-brand" data-aos="fade" tabIndex="-1">
            <AppName />
          </a>
        </Box>
        {/* Menu */}
        <Box className="flex gap-3">
          {isLoggedIn ? (
            <>
              <Box className="hidden lg:block xl:block menu" data-aos="fade">
                <div className="menu-items gap-4" ref={menuRef}>
                  <div className={`auth-menu shadow-sm ${isOpen && "active"}`}>
                    <div
                      className="auth-menu-items gap-1"
                      data-aos="slide-left"
                    >
                      {appAuthMenu.map((menu, index) => {
                        return (
                          <li className="auth-menu-item" key={menu.id || index}>
                            <AppButton
                              className={"auth-menu-btn fw-bold"}
                              path={menu.url}
                              icon={menu.icon}
                              text={menu.title}
                              onClick={() => handleHamburger()}
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
                  <Box
                    data-aos="flip-right"
                    data-aos-delay="900"
                    // onClick={handleProfileMenu}
                    // ref={profileToggleRef}
                    className="flex flex-row-reverse"
                  >
                    <span className="absolute flex size-2 z-1">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
                    </span>
                    <Avatar
                      alt={user.userName}
                      src={userProfile}
                      onClick={handlePopoverCick}
                      sx={{
                        transition: "all 0.5s ease-in-out",
                        cursor: "pointer",
                      }}
                    ></Avatar>
                  </Box>
                  <AppMUIPopover
                    anchorEl={anchorEl}
                    onCloseFn={handleClosePopover}
                    onClickFn={handleProfileMenuClose}
                    textList={[
                      { id: 1, title: user.userName, icon: <Person /> },
                      { id: 2, title: user.userEmail, icon: <Email /> },
                    ]}
                    buttonList={profileMenu}
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
                  icon={<MenuRounded className="text-white" />}
                />
              </Box>
            </>
          ) : (
            <Box>
              <div className="flex">
                {appUnAuthMenu?.map((menu, index) => {
                  return (
                    <li key={menu.id || index}>
                      <AppButton
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
        className="block lg:hidden xl:hidden"
        anchor="right"
        open={isOpen}
      >
        <Box
          sx={{ position: "sticky", top: 0, zIndex: 1 }}
          className="bg-white"
          data-aos="slide-left"
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
        <Box
          data-aos="slide-left"
          // onClick={handleProfileMenu}
          // ref={profileToggleRef}
          className="flex flex-col p-2"
        >
          <List
            data-aos="slide-left"
            className="flex flex-col item-center justify-center"
          >
            {appAuthMenu.map((menu, index) => {
              return (
                <ListItem className="auth-menu-item" key={menu.id || index}>
                  <AppButton
                    className={"auth-menu-btn fw-bold"}
                    path={menu.url}
                    icon={menu.icon}
                    text={menu.title}
                    onClick={() => handleHamburger()}
                  ></AppButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box
          sx={{ position: "sticky", bottom: 0, zIndex: 1 }}
          className="bg-white"
        >
          <List>
            <AppMUIListItemButtonWithIcon buttonList={settingsMenu} />
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
