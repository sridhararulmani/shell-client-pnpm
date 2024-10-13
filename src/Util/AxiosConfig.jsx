import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to show success toast
const showSuccessToast = (message) => {
  toast.success(message);
};

// Function to show error toast
const showErrorToast = (message) => {
  toast.error(message);
};

//Intercept to attach token to headers
api.interceptors.request.use(
  (config) => {
    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/user/registerUser")
    ) {
      console.log("request for login there is no need of tokens");
      return config;
    }
    console.log("Access Token fetching for api request");
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    console.log("Fetched AccessToken from local storage " + accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    showErrorToast(error.message);
    console.log(error.message);
    return Promise.reject(error);
  }
);

//Refreshing Tokens if access token error accured in header for all request
api.interceptors.response.use(
  (response) => {
    showSuccessToast(response);
    return response;
  },
  async (error) => {
    console.log("Refreshing Tokens is Working...");
    const originalRequest = error.config;
    console.log(error);
    showErrorToast(error.message);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      console.log("Refresh Token :" + refreshToken);

      if (refreshToken) {
        try {
          console.log(
            "Auto Request for New Access And New Refresh Token by Axios..."
          );
          const response = await axios.post("/tokens/refreshTokens", {
            refreshToken,
          });
          console.log("Refreshing Tokens :" + response.data);
          const { newAccessToken, newRefreshToken } = response.data;
          console.log("New Access Token :" + newAccessToken);
          console.log("New Refresh Token :" + newRefreshToken);

          localStorage.setItem("ACCESS_TOKEN", newAccessToken);
          localStorage.setItem("REFRESH_TOKEN", newRefreshToken);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`;
          //Retrying the past requestt using new access Token
          return api(originalRequest);
        } catch (error) {
          showErrorToast(error.message);
          console.log("Refresh Token Get Expired .....");
          return Promise.reject(error);
        }
      }
    } else {
      showErrorToast("Token Error");
      // Logout Logic
      console.log("Token error");
    }
  }
);

export default api;
