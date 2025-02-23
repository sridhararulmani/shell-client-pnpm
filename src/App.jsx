import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.min.css";

import PageTitile from "./util/config/GetPageTitile.jsx";
import Navbar from "./components/Header/Navbar.jsx";
import AppLoader from "./components/Pages/AppLoader/AppLoader.jsx";
import Home from "./components/Pages/Home/HomePage.jsx";
import About from "./components/Pages/About/AboutPage.jsx";
import Login from "./components/Pages/Forms/Login/LoginUserPage.jsx";
import Logout from "./components/Pages/Forms/Logout/LogoutUserPage.jsx";
import Register from "./components/Pages/Forms/Register/RegisterUserPage.jsx";
import Shop from "./components/Pages/Shop/ShopPage.jsx";
import AOSProvider from "./util/context/AOSScrollAnimationContext.jsx";

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "./util/context/LoadingContext.jsx";
import { authUserDetails, loadUser } from "./util/config/AuthSetGet.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "./util/redux/userSlice.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import {
  ABOUT_PAGE_URL,
  HOME_PAGE_URL,
  SHOP_PAGE_URL,
  SIGN_IN_PAGE_URL,
  SIGN_OUT_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from "./util/constant/AppUrlConstant.jsx";
import NavigationProvaider from "./util/context/NavigationProvaider.jsx";

const App = () => {
  const dispatch = useDispatch();

  const fetchAuthUser = async () => {
    const userRes = await loadUser();
    const userObj = authUserDetails(userRes);
    dispatch(setUser(userObj));
  };

  useEffect(() => {
    fetchAuthUser();
  }, [dispatch]);

  return (
    <div className="app">
      <ToastContainer
        draggable
        position="top-right"
        newestOnTop
        limit={6}
        progressStyle={locationbar}
      />
      <LoadingProvider>
        <SkeletonTheme
          borderRadius={10}
          baseColor="#e0e0e0"
          highlightColor="#f0f0f0"
        >
          <AOSProvider>
            <Router>
              <NavigationProvaider>
                <PageTitile />
                <Navbar />
                <AppLoader />
                <Routes>
                  <Route exact path={HOME_PAGE_URL} element={<Home />} />
                  <Route exact path={SHOP_PAGE_URL} element={<Shop />}></Route>
                  <Route
                    exact
                    path={ABOUT_PAGE_URL}
                    element={<About />}
                  ></Route>
                  <Route
                    exact
                    path={SIGN_IN_PAGE_URL}
                    element={<Login />}
                  ></Route>
                  <Route
                    exact
                    path={SIGN_OUT_PAGE_URL}
                    element={<Logout />}
                  ></Route>
                  <Route
                    exact
                    path={SIGN_UP_PAGE_URL}
                    element={<Register />}
                  ></Route>
                </Routes>
              </NavigationProvaider>
            </Router>
          </AOSProvider>
        </SkeletonTheme>
      </LoadingProvider>
    </div>
  );
};

export default App;
