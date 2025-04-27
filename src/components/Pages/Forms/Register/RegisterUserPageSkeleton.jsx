import "./RegisterUserPage.min.css";

import Skeleton from "react-loading-skeleton";
import { Box } from "@mui/material";
import AppSkeleton from "../../../../util/skeleton/AppSkeleton";

const RegisterUserPageSkeleton = () => {
  const { AppButtonSkeleton, AppInputSkeleton } = AppSkeleton();

  return (
    <div className="skeleton-card p-3">
      <div className="row">
        <div className="register-form border-0 card rounded-4 px-4 py-5 shadow d-flex flex-column gap-4">
          <h4 className="card-title text-center">
            <Skeleton width={`50%`} height={`100%`}></Skeleton>
          </h4>
          <div className="image-uploader d-felx flex-column align-items-center justify-content-center">
            <Box
              sx={{
                width: 130,
                height: 130,
                position: "relative",
                borderRadius: "100%",
                backgroundColor: "transparent",
                transition: "all 0.5s ease-in-out",
                boxShadow: 1,
              }}
            >
              <Skeleton circle={true} width={`100%`} height={`100%`}></Skeleton>
            </Box>
          </div>
          <AppInputSkeleton count={5} />
          <AppButtonSkeleton count={2} />
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPageSkeleton;
