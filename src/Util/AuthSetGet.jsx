import api from "./AxiosConfig";
// import { useLoading } from "./LoadingContext";

export const logout = () => {
  const { startLoading, stopLoading } = useLoading();
  startLoading();
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  console.log("Logouting from logout method in auth file.....");
  window.location.href = "/";
  stopLoading();
  return null;
};

export const getCurrentUserDetails = async () => {
  const { startLoading, stopLoading } = useLoading();
  startLoading();
  try {
    const response = await api.get("/get-user-details");
    // const userObj = JSON.stringify(response.data);
    // console.log("From Auth method Fetched user :" + userObj);
    console.log("User Fetched Successfully....");
    console.log("User is : " + response.data);
    return response.data;
  } catch (error) {
    console.log("Error wile fetching user etails");
    return error;
  } finally {
    stopLoading();
  }
};
