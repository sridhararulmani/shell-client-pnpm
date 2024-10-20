import "./LoginUserPage.min.css";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../../Util/AxiosConfig";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getCurrentUserDetails } from "../../../../Util/AuthSetGet";
import { useLoading } from "../../../../Util/LoadingContext";
import { toast } from "react-toastify";

const Login = ({ updateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();

  // Function to show success toast
  const showSuccessToast = (message) => {
    toast.success(message);
  };

  // Function to show error toast
  const showErrorToast = (message) => {
    toast.error(message);
  };

  const login = async ({ username, password }) => {
    startLoading();
    try {
      console.log("Try Block is exicuting....");
      const response = await api.post("/auth/login", { username, password });
      console.log("Response Code of Login is : " + response.status);
      console.log("Response Data of Login is : " + response.data);
      console.log("response " + response.data);
      if (response.status === 200) {
        console.log("Login Successfull...");
        const data = response.data;
        updateUser = getCurrentUserDetails;
        localStorage.setItem("USER", updateUser);
        localStorage.setItem("ACCESS_TOKEN", data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
        showSuccessToast(response.data);
        navigate("/");
      } else {
        setError("Invalid Email or Password");
        showErrorToast("Invalid Credintials");
      }
    } catch (error) {
      showErrorToast(error.message);
      setError("Invalid Email or Password");
      console.log("Invalid Email or Password");
      console.log("Catch block getting exicutting...");
    } finally {
      stopLoading();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    login(username, password);
  };

  return (
    <div>
      <div className="container p-3" data-aos="fade">
        <div className="row">
          <form
            onSubmit={handleLogin}
            className="login-form card border-0 rounded-4 bg-light px-4 py-5 shadow d-flex flex-column gap-4"
          >
            <h2 className="card-title text-center">Login</h2>
            <div className="card-body d-flex flex-column gap-4">
              {error && (
                <span className="card border-danger bg-danger p-4 text-white text-center" data-aos="flip-down" data-aos-delay="100">
                  {error}
                </span>
              )}
              <div>
                <label htmlFor="email" className="form-label">
                  Enter User Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  id="email"
                  placeholder="Enter the User Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  Enter User Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter the User Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="btn-grp d-flex gap-5 align-items-center justify-content-center">
              <a href="/" className="btn btn-danger rounded-3 px-3">
                Cancel
              </a>
              <button className="btn btn-success rounded-3 px-3" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
