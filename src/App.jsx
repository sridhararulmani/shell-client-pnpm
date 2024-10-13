import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AuthContext from "./Util/AuthContext.jsx";
import PageTitile from "./Util/GetPageTitile.jsx";
import Navbar from "./components/Header/Navbar.jsx";
import AppLoader from "./components/Pages/AppLoader/AppLoader.jsx";
import Home from "./components/Pages/Home/HomePage.jsx";
import About from "./components/Pages/About/AboutPage.jsx";
import Login from "./components/Pages/Forms/Login/LoginUserPage.jsx";
import Logout from "./components/Pages/Forms/Logout/LogoutUserPage.jsx";
import Register from "./components/Pages/Forms/Register/RegisterUserPage.jsx";
import Shop from "./components/Pages/Shop/ShopPage.jsx";
import { LoadingProvider } from "./Util/LoadingContext.jsx";

const App = () => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("USER") == null
      ? localStorage.setItem("USER", null) && setUser(null)
      : localStorage.getItem("USER")
  );

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("USER", newUser);
  };

  return (
    <div className="app">
      <AuthContext.Provider value={{ user, updateUser }}>
        <LoadingProvider>
          <Router>
            <PageTitile />
            <Navbar user={user} />
            <AppLoader />
            <Routes>
              <Route exact path="/" element={<Home user={user} />} />
              <Route exact path="/shop" element={<Shop />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route
                exact
                path="/login"
                element={<Login updateUser={updateUser} />}
              ></Route>
              <Route
                exact
                path="/logout"
                element={<Logout updateUser={updateUser} />}
              ></Route>
              <Route exact path="/register" element={<Register />}></Route>
            </Routes>
          </Router>
        </LoadingProvider>
        <ToastContainer draggable position="top-right" newestOnTop limit={6} progressStyle={locationbar}/>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
