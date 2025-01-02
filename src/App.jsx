import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AuthContext from "./util/context/AuthContext.jsx";
import PageTitile from "./util/config/GetPageTitile.jsx";
import Navbar from "./components/Header/Navbar.jsx";
import AppLoader from "./components/Pages/AppLoader/AppLoader.jsx";
import Home from "./components/Pages/Home/HomePage.jsx";
import About from "./components/Pages/About/AboutPage.jsx";
import Login from "./components/Pages/Forms/Login/LoginUserPage.jsx";
import Logout from "./components/Pages/Forms/Logout/LogoutUserPage.jsx";
import Register from "./components/Pages/Forms/Register/RegisterUserPage.jsx";
import Shop from "./components/Pages/Shop/ShopPage.jsx";
import { LoadingProvider } from "./util/context/LoadingContext.jsx";
import AOSProvider from "./util/context/AOSScrollAnimationContext.jsx";
import { getCurrentUserDetails } from "./util/config/AuthSetGet.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   localStorage.getItem("ACCESS_TOKEN") != null &&
  //     localStorage.getItem("REFRESH_TOKEN") != null &&
  //     // setUser(getCurrentUserDetails);
  // }, [user]);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <div className="app">
      <AuthContext.Provider value={{ user, updateUser }}>
        <LoadingProvider>
          <AOSProvider>
            <Router>
              <PageTitile />
              <Navbar user={user} />
              <AppLoader />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/shop" element={<Shop />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route
                  exact
                  path="/login"
                  element={<Login/>}
                ></Route>
                <Route
                  exact
                  path="/logout"
                  element={<Logout/>}
                ></Route>
                <Route exact path="/register" element={<Register />}></Route>
              </Routes>
            </Router>
          </AOSProvider>
        </LoadingProvider>
        <ToastContainer
          draggable
          position="top-right"
          newestOnTop
          limit={6}
          progressStyle={locationbar}
        />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
