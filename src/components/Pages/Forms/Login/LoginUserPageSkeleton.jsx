import "./LoginUserPage.min.css";

import AppSkeleton from "../../../../util/skeleton/AppSkeleton";
import { appContainerStyle, dataAosAnimationForContainers, dataAosOnce } from "../../../../util/AppUtils";

const LoginUserPageSkeleton = () => {
  const { AppButtonSkeleton, AppInputSkeleton, AppHeadingSkeleton } =
    AppSkeleton();

  return (
    <div className={`skeleton-card ${appContainerStyle}`} data-aos={dataAosAnimationForContainers} data-aos-once={dataAosOnce}>
      <div className="row">
        <div className="login-form border-0 card rounded-4 px-4 py-5 shadow flex flex-column gap-2">
          <h4 className="card-title text-center">
            <AppHeadingSkeleton />
          </h4>
          <div className="card-body d-flex flex-column gap-2 w-100 overflow-hidden">
            <AppInputSkeleton count={2} />
            <AppButtonSkeleton count={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUserPageSkeleton;
