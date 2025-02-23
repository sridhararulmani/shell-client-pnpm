import "./AppLoader.min.css";
import { useLoading } from "../../../util/context/LoadingContext";

const AppLoader = () => {
  const { isLoading } = useLoading();

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
            <i className="fa-brands fa-shopify"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
