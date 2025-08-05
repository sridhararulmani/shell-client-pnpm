import React from "react";
import {
  appContainerStyle,
  dataAosAnimationForContainers,
  dataAosOnce,
} from "../../../../util/AppUtils";
import { appCard, appCardStyles } from "../../../../util/mui/MUIUtils";
import AppSkeleton from "../../../../util/skeleton/AppSkeleton";

const LogoutUserPageSkeleton = () => {
  const { AppButtonSkeletonRow, AppAvatarSkeleton, AppTextSkeleton } =
    AppSkeleton();
  return (
    <div
      className={`skeleton-card ${appContainerStyle}`}
      data-aos={dataAosAnimationForContainers}
      data-aos-once={dataAosOnce}
    >
      <div
        className={`${appContainerStyle} `}
        data-aos={dataAosAnimationForContainers}
        data-aos-once={dataAosOnce}
      >
        <div className="row">
          <div className={`${appCard} ${appCardStyles} gap-4`}>
            <div
              className="flex item-center justify-center"
              style={{ pointerEvents: "none" }}
            >
              <AppAvatarSkeleton />
            </div>
            <div>
              <p>
                <AppTextSkeleton />
              </p>
              <AppButtonSkeletonRow count={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutUserPageSkeleton;
