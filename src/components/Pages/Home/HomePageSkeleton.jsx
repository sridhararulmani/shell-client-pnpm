import React from "react";
import AppSkeleton from "../../../util/skeleton/AppSkeleton";
import { appCard } from "../../../util/mui/MUIUtils";
import { appContainerStyle, dataAosAnimationForContainers, dataAosOnce } from "../../../util/AppUtils";

const HomePageSkeleton = () => {
  const { AppTextSkeleton, AppHeadingSkeleton } = AppSkeleton();

  return (
    <div className={`flex flex-column gap-4 ${appContainerStyle}`} data-aos={dataAosAnimationForContainers} data-aos-once={dataAosOnce}>
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
