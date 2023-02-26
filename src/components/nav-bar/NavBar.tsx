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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            color: colorPalette[0],
            fontWeight: "bold",
          }}
        >
          Color Generator Site
        </div>
      </div>
    </AppBar>
  );
};

export default NavBar;
