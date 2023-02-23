import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getColorPalette } from "../../api/colorMind";
import ColorContainer from "../../components/color-container/ColorContainer";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import NavBar from "../../components/nav-bar/NavBar";
import { useAppDispatch, useAppSelector } from "../../slices";
import { setRandomColor } from "../../slices/colorPalette";
import { setErrorMessage } from "../../slices/notifications";
import "./MainPage.css";
const MainPage = () => {
  const dispatch = useAppDispatch();
  const colorPalette = useAppSelector(
    (state) => state?.colorPalette?.colorPalette
  );
  const hexcode = useAppSelector(
    (state) => state?.colorPalette?.color?.hexcode
  );
  const errorMessage = useAppSelector(
    (state) => state?.notification?.errorMessage
  );
  const [modeInput, setModeInput] = useState(null);
  const ref = useRef<any>(null);

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

        {errorMessage !== "" ? (
          <div
            id="error-message"
            className="color-error-body"
            style={{ color: colorPalette[0], backgroundColor: colorPalette[4] }}
          >
            errorMessage
          </div>
        ) : null}
        <form
          className="color-palette-selector-form"
          ref={ref}
          style={{ backgroundColor: colorPalette[4] }}
        >
          <TextField
            id="hexcode"
            label="Hex Code"
            variant="outlined"
            style={{ marginRight: "10px", backgroundColor: "white" }}
          />
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Mode</InputLabel>
            <Select
              value={modeInput}
              placeholder="Mode"
              onChange={(e: any) => {
                setModeInput(e.target.value);
              }}
              style={{ marginLeft: "10px", backgroundColor: "white" }}
            >
              <MenuItem value="monochrome">Monochrome</MenuItem>
              <MenuItem value="monochrome-dark">Monochrome Dark</MenuItem>
              <MenuItem value="monochrome-light">Monochrome Light</MenuItem>
              <MenuItem value="analogic">Analogic</MenuItem>
              <MenuItem value="complement">Complement</MenuItem>
              <MenuItem value="analogic-complement">
                Analogic Complement
              </MenuItem>
              <MenuItem value="triad">Triad</MenuItem>
              <MenuItem value="quad">Quad</MenuItem>
            </Select>
          </FormControl>
        </form>
        <div>
          <Button
            variant="contained"
            style={{
              marginTop: "30px",
              backgroundColor: "black",
              marginRight: "10px",
            }}
            onClick={() => {
              const hex = ref?.current?.elements["hexcode"].value.replace(
                "#",
                ""
              );
              if (hex.length === 6) {
                dispatch(
                  getColorPalette({
                    hexcode: hex,
                    mode: modeInput ?? "monochrome",
                  })
                );
                dispatch(setErrorMessage(""));
              } else {
                dispatch(setErrorMessage("Please enter 6 character hex code"));
              }
            }}
          >
            Generate
          </Button>
          <Button
            variant="contained"
            style={{
              marginTop: "30px",
              backgroundColor: "black",
              marginLeft: "10px",
            }}
            onClick={() => {
              dispatch(setRandomColor());
              dispatch(
                getColorPalette({ hexcode: hexcode, mode: "monochrome" })
              );
            }}
          >
            Generate Random
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
