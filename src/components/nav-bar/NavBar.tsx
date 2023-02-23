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
      <div>NAV BAR</div>
    </AppBar>
  );
};

export default NavBar;
