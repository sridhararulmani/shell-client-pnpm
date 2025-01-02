import axios from "axios";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../constant/ToastUtil";

const APP_URL = "/shell";

const API_BASE_URL = "http://localhost:8080" + APP_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//Intercept to attach token to headers
api.interceptors.request.use(
  (config) => {
    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/user/registerUser")
    ) {
      console.log(config?.headers);
      console.log("request for login there is no need of tokens");
    } else {
      console.log("Access Token fetching for api request");
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      // console.log("Fetched AccessToken from local storage " + accessToken);
      console.log(config?.headers);
      if (accessToken != null) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        console.log(config?.headers);
      }
      console.log(config?.headers);
    }
    return config;
  },
  (error) => {
    const { status, message } = error.response.data;
    showErrorToast(message);
    console.log(message);
    return Promise.reject(error);
  }
);

//Refreshing Tokens if access token error accured in header for all request
api.interceptors.response.use(
  (response) => {
    console.log(response);
    const { status, message } = response.data;
    showSuccessToast(message);
    console.log(message);
    return response;
  },
  async (error) => {
    console.log("Refreshing Tokens is Working...");
    const { message } = error?.response?.data;
    const originalRequest = error?.config;
    console.log(error);
    console.log(message);
    showErrorToast(message);
    if (error && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");
      if (refreshToken != null) {
        console.log("Refresh Token :" + refreshToken);
        try {
          console.log(
            "Auto Request for New Access And New Refresh Token by Axios..."
          );
          const response = await api.post("/tokens/refreshTokens", {
            refreshToken,
          });
          console.log("Refreshing Tokens :" + response?.data);
          const { newAccessToken, newRefreshToken } = response?.data;
          console.log("New Access Token :" + newAccessToken);
          console.log("New Refresh Token :" + newRefreshToken);
          localStorage.setItem("ACCESS_TOKEN", newAccessToken);
          localStorage.setItem("REFRESH_TOKEN", newRefreshToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`;
          //Retrying the past requestt using new access Token
          return api(originalRequest);
        } catch (error) {
          showErrorToast(error?.message);
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
