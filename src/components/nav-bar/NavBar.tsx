import React from "react";
import AppBar from "@mui/material/AppBar";
import { useAppSelector } from "../../slices";

const NavBar = (): JSX.Element => {
  const colorPalette = useAppSelector(
    (state) => state?.colorPalette?.colorPalette
  );
  return (
    <AppBar
      position="fixed"
      style={{ height: "50px", backgroundColor: colorPalette[2] }}
    >
      <div style={{ fontSize: "10px" }}>Color 3</div>
      <div style={{ display: "flex" }}></div>
    </AppBar>
  );
};

export default NavBar;
