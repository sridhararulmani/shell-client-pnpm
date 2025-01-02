import "./LoginUserPage.min.css";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../../util/config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getCurrentUserDetails } from "../../../../util/config/AuthSetGet";
import { useLoading } from "../../../../util/context/LoadingContext";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../util/constant/ToastUtil";

const Login = () => {
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const [userCridentials, setUserCridentials] = useState({
    userName: "",
    userPassword: "",
  });

  const [error, setError] = useState(null);

  if (error) {
    setTimeout(() => {
      setError("");
    }, 6000);
  }

  const login = async (userCridentials) => {
    startLoading();
    try {
      const response = await api.post("/auth/login", userCridentials);
      if (response) {
        const { accessToken, refreshToken } = response?.data;
        // updateUser = getCurrentUserDetails;
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        localStorage.setItem("REFRESH_TOKEN", refreshToken);
        showSuccessToast("Login Success");
        navigate("/");
      } else {
        setError("Invalid Email or userPassword");
        // showErrorToast("Invalid Credintials");
      }
    } catch (error) {
      console.log(error);
      // showErrorToast(error?.message);
      console.log("Somting went wrong in login process...");
    } finally {
      stopLoading();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    login(userCridentials);
  };

  const handleChange = (e) => {
    setUserCridentials({ ...userCridentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container p-3" data-aos="fade">
        <div className="row">
          <form
            onSubmit={handleLogin}
            className="login-form border-0 card rounded-4 bg-light px-4 py-5 shadow d-flex flex-column gap-4"
          >
            <h2 className="card-title text-center">Sign in User</h2>
            <div className="card-body d-flex flex-column gap-4 w-100 overflow-hidden">
              {error && (
                <span
                  className="card border-danger bg-danger p-4 text-white text-center"
                  data-aos="zoom-in"
                  data-aos-delay="10"
                >
                  {error}
                </span>
              )}
              <div>
                <label htmlFor="email" className="form-label">
                  Enter User Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter the User Email"
                  name="userName"
                  value={userCridentials.userName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="userPassword" className="form-label">
                  Enter User Password
                </label>
                <input
                  id="userPassword"
                  type="userPassword"
                  className="form-control"
                  placeholder="Enter the User userPassword"
                  name="userPassword"
                  value={userCridentials.userPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="btn-grp d-flex gap-3 mt-4 align-items-center justify-content-center">
                <a href="/" className="btn custom-btn w-100 rounded-5 px-3">
                  Cancel
                </a>
                <button
                  className="btn custom-btn w-100 rounded-5 px-3"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
