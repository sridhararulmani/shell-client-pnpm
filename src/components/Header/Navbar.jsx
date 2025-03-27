import "./Navbar.min.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../util/config/AxiosConfig";

import getFileIntoBase64 from "../../util/config/GetFileIntoBase64";
import { Avatar, Box } from "@mui/material";
import { appAuthMenu, appUnAuthMenu } from "../../util/constant/AppMenu";
import { NavLink } from "react-router-dom";
import AppSkeleton from "../../util/skeleton/AppSkeleton";
import AppConstant from "../../util/constant/AppConstant";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userProfile, setUserProfile] = useState();

  const { TextSkeleton } = AppSkeleton();
  const { AppButton, AppName } = AppConstant();

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

  const handleClickingOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target) &&
      profileToggleRef.current &&
      !profileToggleRef.current.contains(event.target)
    ) {
      setIsProfileOpen(false);
    }
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
    <header
      className="navbar navbar-expand-lg w-100 navbar-dark bg-dark shadow-sm"
      data-aos="slide-down"
    >
      <div className="container d-flex flex-row align-items-center justify-content-between">
        <a
          href="/"
          className="navbar-brand fs-3 fw-bold"
          data-aos="fade"
          tabIndex="-1"
        >
          {/* <i className="fa-brands fa-shopify"></i>Shell. */}
          <AppName />
        </a>
        <div className="menu" data-aos="fade">
          {!isLoggedIn ? (
            <div className="menu-items gap-4" ref={menuRef}>
              <div className={`auth-menu shadow-sm ${isOpen && "active"}`}>
                <div className="auth-menu-items" data-aos="slide-left">
                  {appAuthMenu.map((menu, index) => {
                    return (
                      <li className="auth-menu-item" key={menu.id || index}>
                        <AppButton
                          className={"auth-menu-btn fw-bold"}
                          path={menu.url}
                          icon={menu.icon}
                          text={menu.title}
                          onClick={() => handleHamburger()}
                        >
                        </AppButton>
                        {/* <NavLink
                          className="auth-menu-btn fw-bold"
                          to={menu.url}
                          onClick={() => handleHamburger()}
                        >
                          {menu.title}
                        </NavLink> */}
                      </li>
                    );
                  })}
                </div>
              </div>
              <div className="menu-details">
                <div
                  className="hamburger-menu"
                  onClick={handleHamburger}
                  ref={toggleRef}
                >
                  {!isOpen ? (
                    <div className="open-icon">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <div className="close-icon">
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
                <Box
                  // className="user-profile-image-container rounded-circle border border-light"
                  data-aos="flip-right"
                  data-aos-delay="900"
                  onClick={handleProfileMenu}
                  ref={profileToggleRef}
                >
                  <Avatar
                    alt="User profile"
                    src={userProfile}
                    sx={{
                      transition: "all 0.5s ease-in-out",
                      cursor: "pointer",
                    }}
                  ></Avatar>
                </Box>
                {isProfileOpen && (
                  <div
                    className="profile-menu p-4 rounded shadow-sm"
                    ref={profileMenuRef}
                  >
                    <TextSkeleton
                      className="text-wrap"
                      text={user.userName}
                      delay={500}
                    />
                    <hr />
                    <TextSkeleton
                      className="text-wrap"
                      text={user.userEmail}
                      delay={500}
                    />
                    <hr />
                    <a href="" className="text-white">
                      Settings
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="unAuth-menu">
              {appUnAuthMenu?.map((menu, index) => {
                return (
                  <li key={menu.id}>
                    <AppButton
                      className={"unAuth-menu-btn fw-bold"}
                      path={menu.url}
                      icon={menu.icon}
                      text={menu.title}
                    ></AppButton>
                  </li>
                  // <NavLink
                  //   className="unAuth-menu-btn fw-bold rounded-4"
                  //   key={menu.id || index}
                  //   to={menu.url}
                  // >
                  //   {menu.title}
                  // </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
