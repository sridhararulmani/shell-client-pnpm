import { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const ImageSkeleton = ({ imgSrc, altText, delay = 1800 }) => {
  let user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div style={{ with: "100%", height: "100%" }}>
      {!isLoading ? (
        <img
          src={imgSrc}
          alt={altText}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Skeleton
          style={{
            with: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
};

export default ImageSkeleton;
