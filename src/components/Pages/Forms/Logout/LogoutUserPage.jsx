import "./LogoutUserPage.min.css";

import { authUserDetails, loadUser } from "../../../../util/config/AuthSetGet";
import { useLoading } from "../../../../util/context/LoadingContext";
import { showWarningToast } from "../../../../util/constant/ToastUtil";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../../../../util/redux/userSlice";
import api, { clearLocalStorage } from "../../../../util/config/AxiosConfig";
import AppConstant from "../../../../util/constant/AppConstant";
import getFileIntoBase64 from "../../../../util/config/GetFileIntoBase64";
import { useState } from "react";
import { useEffect } from "react";
import { appCard, appCardStyles } from "../../../../util/mui/MUIUtils";

const Logout = () => {
  const navigate = useNavigate();

  let user = useSelector((state) => state.user);

  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    setUserProfile(() =>
      user != null
        ? getFileIntoBase64(user.profileImage, user.profileImageType)
        : ""
    );
  }, [user]);

  const { startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch();

  const { CancelButton, Button, AppUserProfileAvatar } = AppConstant();

  const fetchAuthUser = async () => {
    const userRes = await loadUser();
    const userObj = authUserDetails(userRes);
    dispatch(setUser(userObj));
  };

  const handleLogout = async () => {
    startLoading();
    try {
      const response = await api.post("/auth/logout");
      if (response?.data?.status === 200) {
        clearLocalStorage();
        // showSuccessToast(response?.data?.message);
        fetchAuthUser();
        navigate("/");
      }
    } catch (error) {
      showWarningToast(error);
      console.log(error);
      navigate("/");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="p-3" data-aos="fade">
      <div className="row">
        <div className={`${appCard} ${appCardStyles}`}>
          <span className="absolute -top-5">
            <AppUserProfileAvatar
              userProfile={userProfile}
              altText={user.userName}
              dataAos={"zoom-in"}
              isHideDock="true"
            />
          </span>
          <p className="card-title text-center">
            Are you Sure. You wants to logout!
          </p>
          <div className="card-body d-flex flex-row gap-5 align-items-center justify-content-center">
            <CancelButton buttonText={"Back"} />
            <Button buttonText={"Yes"} onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
