import React from "react";
import Skeleton from "react-loading-skeleton";

export const NoteSkeleton = (props) => {
  return (
    <>
      <Skeleton width={"100%"} height={64} />
      <Skeleton width={"100%"} height={120} count={5} />
    </>
  );
};

export const NoteHeaderSkeleton = () => {
  return <Skeleton height={50} />;
};

export const TabSkeleton = () => {
  return (
    <div>
      <Skeleton width={"30%"} height={40} />
   
    </div>
  );
};
