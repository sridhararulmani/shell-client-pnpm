import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const AppSkeleton = () => {
  let user = useSelector((state) => state.user);

  const TextSkeleton = useCallback(({ text, delay = 1500 }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return <span>{isLoading ? <Skeleton /> : text}</span>;
  }, []);

  const AppInputSkeleton = useCallback(({ count = 1 }) => {
    return (
      <Skeleton
        width={`100%`}
        height={40}
        count={count}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      ></Skeleton>
    );
  }, []);

  const AppButtonSkeleton = useCallback(({ count = 1 }) => {
    return (
      <Skeleton
        width={`100%`}
        height={35}
        borderRadius={50}
        count={count}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      ></Skeleton>
    );
  }, []);

  const AppButtonSkeletonRow = useCallback(({ count = 1 }) => {
    return (
      <Skeleton
        width={`100%`}
        height={35}
        borderRadius={50}
        count={count}
        style={{ display: "flex", flexDirection: "row", gap: "2px" }}
      ></Skeleton>
    );
  }, []);
  
  const AppTextSkeleton = useCallback(({ count = 1 }) => {
    return (
      <>
        <Skeleton width={`100%`} height={15} count={count}></Skeleton>
        <Skeleton width={`50%`} height={15}></Skeleton>
      </>
    );
  }, []);

  const AppTextSingleLineSkeleton = useCallback(({ count = 1 }) => {
    return (
      <>
        <Skeleton width={`80%`} height={15} count={count}></Skeleton>
      </>
    );
  }, []);

  const AppHeadingSkeleton = useCallback(({ count = 1, width = `50%` }) => {
    return <Skeleton width={width} height={`100%`} count={count}></Skeleton>;
  }, []);

  const AppAvatarSkeleton = useCallback(({ count = 1}) => {
    return <Skeleton className={`!w-15 !h-15`} count={count} borderRadius={`50px`}/>;
  }, []);

  return {
    TextSkeleton,
    AppButtonSkeleton,
    AppInputSkeleton,
    AppTextSkeleton,
    AppTextSingleLineSkeleton,
    AppHeadingSkeleton,
    AppAvatarSkeleton,
    AppButtonSkeletonRow,
  };
};
export default AppSkeleton;
