import "./App.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import AOSProvider from "./util/context/AOSScrollAnimationContext.jsx";
import { ToastContainer } from "react-toastify";
import { SkeletonTheme } from "react-loading-skeleton";
import { setUser } from "./util/redux/userSlice.jsx";


import AppLoader from "./components/Pages/AppLoader/AppLoader.jsx";
import PageTitile from "./util/config/GetPageTitile.jsx";
import NavigationProvaider from "./util/context/NavigationContext.jsx";
import { LoadingProvider } from "./util/context/LoadingContext.jsx";
import { authUserDetails, loadUser } from "./util/config/AuthSetGet.jsx";

import {
  ABOUT_PAGE_URL,
  HOME_PAGE_URL,
  SHOP_PAGE_URL,
  SIGN_IN_PAGE_URL,
  SIGN_OUT_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from "./util/constant/AppUrlConstant.jsx";

import Navbar from "./components/Header/Navbar.jsx";
import HomePageSkeleton from "./components/Pages/Home/HomePageSkeleton.jsx";
import LoginUserPageSkeleton from "./components/Pages/Forms/Login/LoginUserPageSkeleton.jsx";
import ShopPageSkeleton from "./components/Pages/Shop/ShopPageSkeleton.jsx";
import AboutPageSkeleton from "./components/Pages/About/AboutPageSkeleton.jsx";
import RegisterUserPageSkeleton from "./components/Pages/Forms/Register/RegisterUserPageSkeleton.jsx";
import LogoutUserPageSkeleton from "./components/Pages/Forms/Logout/LogoutUserPageSkeleton.jsx";
import ThemeProvider from "./util/context/ThemeContext.jsx";

const App = () => {
  const dispatch = useDispatch();

  const fetchAuthUser = useCallback(async () => {
    const userRes = await loadUser();
    const userObj = authUserDetails(userRes);
    dispatch(setUser(userObj));
  }, []);

  useEffect(() => {
    fetchAuthUser();
  }, [dispatch]);

  const Home = React.lazy(() => import("./components/Pages/Home/HomePage.jsx"));
  const Shop = React.lazy(() => import("./components/Pages/Shop/ShopPage.jsx"));
  const About = React.lazy(() =>
    import("./components/Pages/About/AboutPage.jsx")
  );
  const Login = React.lazy(() =>
    import("./components/Pages/Forms/Login/LoginUserPage.jsx")
  );
  const Logout = React.lazy(() =>
    import("./components/Pages/Forms/Logout/LogoutUserPage.jsx")
  );
  const Register = React.lazy(() =>
    import("./components/Pages/Forms/Register/RegisterUserPage.jsx")
  );

  return (
    <ThemeProvider>
      <div className="app-body app-bg-primary">
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
            baseColor="var(--bg-secondary)"
            highlightColor="#f0f0f0"
          >
            <AOSProvider>
              <Router>
                <NavigationProvaider>
                  <PageTitile />
                  <Navbar />
                  <AppLoader />
                  <section className="container">
                    <Suspense fallback={<p>Loading...</p>}>
                      <Routes>
                        <Route
                          exact
                          path={HOME_PAGE_URL}
                          element={
                            <Suspense fallback={<HomePageSkeleton />}>
                              <Home />
                            </Suspense>
                          }
                        />
                        <Route
                          exact
                          path={SHOP_PAGE_URL}
                          element={
                            <Suspense fallback={<ShopPageSkeleton />}>
                              <Shop />
                            </Suspense>
                          }
                        ></Route>
                        <Route
                          exact
                          path={ABOUT_PAGE_URL}
                          element={
                            <Suspense fallback={<AboutPageSkeleton />}>
                              <About />
                            </Suspense>
                          }
                        ></Route>
                        <Route
                          exact
                          path={SIGN_IN_PAGE_URL}
                          element={
                            <Suspense fallback={<LoginUserPageSkeleton />}>
                              <Login />
                            </Suspense>
                          }
                        ></Route>
                        <Route
                          exact
                          path={SIGN_OUT_PAGE_URL}
                          element={
                            <Suspense fallback={<LogoutUserPageSkeleton />}>
                              <Logout />
                            </Suspense>
                          }
                        ></Route>
                        <Route
                          exact
                          path={SIGN_UP_PAGE_URL}
                          element={
                            <Suspense fallback={<RegisterUserPageSkeleton />}>
                              <Register />
                            </Suspense>
                          }
                        ></Route>
                      </Routes>
                    </Suspense>
                  </section>
                </NavigationProvaider>
              </Router>
            </AOSProvider>
          </SkeletonTheme>
        </LoadingProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
