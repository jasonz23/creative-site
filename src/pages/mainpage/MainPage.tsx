import React from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../slices";

const MainPage = () => {
  const colorPalette = useAppSelector(
    (state) => state?.colorPalette?.colorPalette
  );
  return (
    <>
      {console.log(colorPalette)}
      <div></div>
    </>
  );
};

export default MainPage;
