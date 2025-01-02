
import api from "./AxiosConfig";

export const logout = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  console.log("Logouting from logout method in auth file.....");
  window.location.href = "/";
  return null;
};

export const getCurrentUserDetails = async () => {
  try {
    const response = await api.get("/get-login-user");
    console.log("User Fetched Successfully....");
    console.log("user logges in  fetch response :" + response);
    console.log("User is : " + response.data);
    // const userObj = JSON.stringify(response.data);
    // console.log("From Auth method Fetched user :" + userObj);
    return response.data;
  } catch (error) {
    console.log("Error wile fetching user etails");
    return error;
  } 
};
