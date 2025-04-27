import React from "react";
import { appCard } from "../../../util/mui/MUIUtils";
import AppSkeleton from "../../../util/skeleton/AppSkeleton";

const ShopPageSkeleton = () => {
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

export default ShopPageSkeleton;
