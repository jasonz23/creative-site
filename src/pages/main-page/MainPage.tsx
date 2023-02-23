import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getColorPalette } from "../../api/colorMind";
import ColorContainer from "../../components/color-container/ColorContainer";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import NavBar from "../../components/nav-bar/NavBar";
import { useAppDispatch, useAppSelector } from "../../slices";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const colorPalette = useAppSelector(
    (state) => state?.colorPalette?.colorPalette
  );
  useEffect(() => {
    console.log(colorPalette);
  });
  return (
    <>
      <NavBar />
      <LoadingIcon />
      <div
        style={{
          backgroundColor: colorPalette[3],
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "fixed",
        }}
      >
        <h1 style={{ color: colorPalette[0] }}>Color Palette Generator</h1>
        <ColorContainer />
        <Button
          variant="contained"
          style={{
            marginTop: "30px",
            backgroundColor: "black",
          }}
          onClick={() => {
            dispatch(getColorPalette("-1"));
          }}
        >
          Generate Random
        </Button>
      </div>
    </>
  );
};

export default MainPage;
