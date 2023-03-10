import { useEffect } from "react";
import { useAppSelector } from "../../slices";
import "./LoadingIcon.css";

const LoadingIcon = () => {
  const showLoadingIcon = useAppSelector(
    (state) => state?.notification?.loadingIcon
  );
  return showLoadingIcon ? (
    <div className="loading-icon-root">
      <p style={{ color: "white", fontSize: "20px" }}>Loading ...</p>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default LoadingIcon;
