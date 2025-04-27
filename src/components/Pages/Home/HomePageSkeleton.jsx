import React from "react";
import AppSkeleton from "../../../util/skeleton/AppSkeleton";
import { appCard } from "../../../util/mui/MUIUtils";

const HomePageSkeleton = () => {
  const { AppTextSkeleton, AppHeadingSkeleton } = AppSkeleton();

  return (
    <div className="p-3 flex flex-column gap-4">
      <div className="row gap-4">
        <div className={"skeleton-card card p-3" + `${appCard}`}>
          <h1>
            <AppHeadingSkeleton />
          </h1>
          <p>
            <AppTextSkeleton count={5} />
          </p>
        </div>
        <div className={"skeleton-card card p-3" + `${appCard}`}>
          <h1>
            <AppHeadingSkeleton />
          </h1>
          <p>
            <AppTextSkeleton count={5} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
