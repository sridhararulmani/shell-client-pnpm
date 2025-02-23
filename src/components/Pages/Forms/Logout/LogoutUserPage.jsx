import { authUserDetails, loadUser } from "../../../../util/config/AuthSetGet";
import "./LogoutUserPage.min.css";
import { useLoading } from "../../../../util/context/LoadingContext";
import {
  showSuccessToast,
  showWarningToast,
} from "../../../../util/constant/ToastUtil";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../util/redux/userSlice";
import api, { clearLocalStorage } from "../../../../util/config/AxiosConfig";
import AppConstant from "../../../../util/constant/AppConstant";

const Logout = () => {
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch();

  const { CancelButton, Button } = AppConstant();

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
    <div className="container p-3" data-aos="fade">
      <div className="row">
        <div className="card logout-form p-5 border-0 bg-light shadow">
          <p className="card-title text-center">Are you Sure. You wants to logout!</p>
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
