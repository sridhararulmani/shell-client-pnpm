import { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const AppSkeleton = () => {
  let user = useSelector((state) => state.user);

  const TextSkeleton = ({ text, delay = 1500 }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <span>{isLoading ? <Skeleton /> : text}</span>
    );
  };

  return { TextSkeleton };
};
export default AppSkeleton;
