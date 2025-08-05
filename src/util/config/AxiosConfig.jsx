import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toast/ToastUtil";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../AppUtils";

const APP_URL = "/shell";

const API_BASE_URL = "http://localhost:8081" + APP_URL;

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

export const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getTokens = () => {
  return { getAccessToken, getRefreshToken };
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

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
      !config.url.includes("/login") ||
      !config.url.includes("/registerUser")
    ) {
      console.log(config?.headers);
      const accessToken = getAccessToken();
      if (accessToken != null) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    console.log("Axios error ---> ", error);
    const { status, message } = error?.response?.data;
    console.log(message);
    message && showErrorToast(message);
    return Promise.reject(error);
  }
);

//Refreshing Tokens if access token error accured in header for all request
api.interceptors.response.use(
  (response) => {
    console.log("Axios --> ", response.data);
    const { status, message } = response?.data;
    console.log(message);
    message && showSuccessToast(message);
    return response;
  },
  async (error) => {
    // const { message } = error?.data;
    const originalRequest = error?.config;
    console.error("Error Accured in Request ---> ---> " + error?.message);
    // console.log(message);
    showErrorToast(error?.response?.data?.message ?? error?.message);
    const refreshToken = getRefreshToken();
    if (error) {
      if (error.status === 403 && refreshToken) {
        console.log("Refreshing Tokens is Working...");
        // originalRequest._retry = true;
        console.log("Refresh Token : " + refreshToken);
        try {
          console.log(
            "Auto Request for New Access And New Refresh Token by Axios..."
          );
          const response = await api.post("/auth/tokens/refreshTokens", {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          console.log("Refreshing Tokens :" + response?.data);
          const { newAccessToken, newRefreshToken } = response?.data;
          console.log("New Access Token :" + newAccessToken);
          console.log("New Refresh Token :" + newRefreshToken);
          storeTokens(newAccessToken, newRefreshToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
          //Retrying the past requestt using new access Token
          return api(originalRequest);
        } catch (error) {
          showErrorToast(error?.message);
          console.log("Refresh Token Get Expired .....");
          if (error.status === 401) {
            clearLocalStorage();
            window.location.href = "/";
          }
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    } else {
      showErrorToast(error?.message);
      // Logout Logic
      clearLocalStorage();
      console.log("Token Error");
    }
  }
);

export default api;
