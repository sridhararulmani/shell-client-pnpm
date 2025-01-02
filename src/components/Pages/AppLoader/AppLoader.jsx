import "./AppLoader.min.css";
import { useLoading } from "../../../util/context/LoadingContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AppLoader = () => {
  const { isLoading } = useLoading();

  const [toastId, setToastId] = useState();

  // useEffect(() => {
  //   if (isLoading) {
  //     const toastId = toast.loading(
  //       <>
  //         <i className="fa-brands fa-shopify fs-5"></i>&nbsp;
  //         <span className="fw-bold">Loading...</span>
  //       </>
  //     );
  //     setToastId(toastId);
  //   } else {
  //     if (toastId) {
  //       toast.dismiss(toastId);
  //     }
  //   }
  // }, [isLoading]);

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
