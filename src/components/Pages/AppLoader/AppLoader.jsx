import "./AppLoader.min.css";
import { useLoading } from "../../../util/context/LoadingContext";
import AppConstant from "../../../util/constant/AppConstant";

const AppLoader = () => {
  const { isLoading } = useLoading();
  const { AppLogoSvg } = AppConstant();

  return (
    <div
      className={
        "loading-logo-div d-flex align-items-center justify-content-center h-100 w-100 " +
        `${isLoading ? "d-block" : "d-none"}`
      }
    >
      <div className="logo-div d-flex align-items-center justify-content-center">
        <div className="ring">
          <div className="ring1 d-flex align-items-center justify-content-center">
            {/* <i className="fa-brands fa-shopify"></i> */}
            <AppLogoSvg className="logo"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
