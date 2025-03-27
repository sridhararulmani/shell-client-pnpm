import React from "react";
import Skeleton from "react-loading-skeleton";

const AboutPageSkeleton = () => {
  return (
    <div className="skeleton-card p-3">
      <h1>
        <Skeleton width={`50%`} height={`100%`}></Skeleton>
      </h1>
      <p>
        <Skeleton width={`80%`} height={`100%`}></Skeleton>
        <Skeleton width={`80%`} height={`100%`}></Skeleton>
        <Skeleton width={`80%`} height={`100%`}></Skeleton>
        <Skeleton width={`40%`} height={`100%`}></Skeleton>
      </p>
    </div>
  );
};

export default AboutPageSkeleton;
