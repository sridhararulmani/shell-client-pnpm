import { NavLink } from "react-router-dom";
import "./Navbar.min.css";
import { useEffect, useRef, useState } from "react";
import getFileIntoBase64 from "../../util/config/GetFileIntoBase64";
import { getCurrentUserDetails } from "../../util/config/AuthSetGet";
import api from "../../util/config/AxiosConfig";

const Navbar = () => {
  const [userProfile, setUserProfile] = useState();
  const [user, setUser] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileToggleRef = useRef(null);

  useEffect(() => {
    setUser(localStorage.getItem("ACCESS_TOKEN") != null ? "User" : null);
    // getCurrentUserDetails();
    const response = api.get("/get-login-user");
    console.log(response);
  }, []);

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

  useEffect(() => {
    setUserProfile(() =>
      user != null ? getFileIntoBase64(user.userProfile) : ""
    );
    console.log("User is " + user);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickingOutside);
    return () => {
      document.removeEventListener("click", handleClickingOutside);
    };
  }, []);

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="navbar navbar-expand-lg w-100 navbar-dark bg-dark py-3 shadow-sm">
      <div className="container d-flex flex-row align-items-center justify-content-between">
        <a href="/" className="navbar-brand fs-3 fw-bold" data-aos="fade">
          <i className="fa-brands fa-shopify"></i>Shell.
        </a>
        <div className="menu" data-aos="fade">
          {!user ? (
            <div className="unAuth-menu">
              <NavLink
                className="unAuth-menu-btn fw-bold rounded-4"
                to={"/login"}
              >
                Sign in
              </NavLink>
              <NavLink
                className="unAuth-menu-btn fw-bold rounded-4"
                to={"/register"}
              >
                Sign up
              </NavLink>
            </div>
          ) : (
            <div className="menu-items gap-4" ref={menuRef}>
              <div className={`auth-menu shadow ${isOpen && "active"}`}>
                <div className="auth-menu-items" data-aos="slide-left">
                  <li className="auth-menu-item">
                    <NavLink className="auth-menu-btn fw-bold" to={"/"}>
                      Home
                    </NavLink>
                  </li>
                  <li className="auth-menu-item">
                    <NavLink className="auth-menu-btn fw-bold" to={"/shop"}>
                      Shop
                    </NavLink>
                  </li>
                  <li className="auth-menu-item">
                    <NavLink className="auth-menu-btn fw-bold" to={"/about"}>
                      About
                    </NavLink>
                  </li>
                  <li className="auth-menu-item">
                    <NavLink className="auth-menu-btn fw-bold" to={"/logout"}>
                      Logout
                    </NavLink>
                  </li>
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
                <span
                  className="user-profile-image-container border"
                  onClick={handleProfileMenu}
                >
                  {userProfile && (
                    <img
                      src={userProfile}
                      alt="user-profile-image"
                      className="user-profile-image"
                      ref={profileToggleRef}
                    />
                  )}
                </span>
                {isProfileOpen && (
                  <div
                    className="profile-menu p-5 rounded shadow"
                    ref={profileMenuRef}
                  >
                    <p className="text-wrap">{user.userName}</p>
                    <hr />
                    <p className="text-wrap">{user.userEmail}</p>
                    <hr />
                    <a href="" className="text-white">
                      Settings
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
