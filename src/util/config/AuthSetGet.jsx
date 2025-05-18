import api, { getAccessToken } from "./AxiosConfig";
import { showErrorToast } from "../toast/ToastUtil";

export const getCurrentUserDetails = async () => {
  try {
    if (getAccessToken()) {
      const response = await api.get("/auth/get-login-user");
      console.log("User Fetched Successfully....");
      const userObj = response?.data;
      return userObj;
    } else {
      // showErrorToast("Unauthorized");
      return null;
    }
  } catch (error) {
    console.error(error);
    showErrorToast("Error wile fetching user details");
    console.log("Error wile fetching user details");
    return null;
  } finally {
  }
};

export const loadUser = async () => {
  return await getCurrentUserDetails();
};

export const authUserDetails = (user) => {
  return {
    userName: user?.userName || null,
    userEmail: user?.userEmail || null,
    profileImage: user?.profileImage || null,
    profileImageType: user?.profileImageType || null,
    userRoles: user?.userRoles || [],
  };
};
