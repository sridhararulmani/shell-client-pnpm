import React from "react";
import AppSkeleton from "../../../util/skeleton/AppSkeleton";

const HomePageSkeleton = () => {
  const { AppTextSkeleton, AppHeadingSkeleton } = AppSkeleton();

  return (
    <>
      <div className="skeleton-card p-3">
        <h1>
          <AppHeadingSkeleton />
        </h1>
        <p>
          <AppTextSkeleton count={5} />
        </p>
      </div>
      <div className="skeleton-card p-3">
        <h1>
          <AppHeadingSkeleton />
        </h1>
        <p>
          <AppTextSkeleton count={5} />
        </p>
      </div>
    </>
  );
};

export default HomePageSkeleton;
