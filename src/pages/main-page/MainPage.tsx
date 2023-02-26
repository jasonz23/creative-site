import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { getColorPalette } from "../../api/colorMind";
import ColorContainer from "../../components/color-container/ColorContainer";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import NavBar from "../../components/nav-bar/NavBar";
import { useAppDispatch, useAppSelector } from "../../slices";
import { addToPrevious, getRandomColor } from "../../slices/colorPalette";
import { setErrorMessage } from "../../slices/notifications";
import "./MainPage.css";
const MainPage = () => {
  const dispatch = useAppDispatch();
  const colorPalette = useAppSelector(
    (state) => state?.colorPalette?.colorPalette
  );
  const errorMessage = useAppSelector(
    (state) => state?.notification?.errorMessage
  );
  const previous = useAppSelector((state) => state?.colorPalette?.previous);
  const loadingState = useAppSelector(
    (state) => state?.notification?.loadingIcon
  );
  const [modeInput, setModeInput] = useState(null);
  const ref = useRef<any>(null);

  return (
    <>
      <NavBar />
      <LoadingIcon />
      {!loadingState ? (
        <div
          style={{
            backgroundColor: colorPalette[3],
            marginTop: "50px",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <h1 style={{ color: colorPalette[0] }}>Color Palette Generator</h1>
          <ColorContainer colorPalette={colorPalette} main={true} />

          {errorMessage !== "" ? (
            <div
              id="error-message"
              className="color-error-body"
              style={{
                color: colorPalette[0],
                backgroundColor: colorPalette[4],
              }}
            >
              {errorMessage}
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
                if (
                  hex.length === 6 &&
                  /^#?([a-f0-9]{6}|[a-f0-9]{3})$/.test(hex)
                ) {
                  dispatch(addToPrevious(colorPalette));
                  dispatch(
                    getColorPalette(
                      {
                        hexcode: hex,
                        mode: modeInput ?? "monochrome",
                      },
                      0
                    )
                  );
                  dispatch(setErrorMessage(""));
                } else {
                  dispatch(
                    setErrorMessage("Please enter 6 character hex code")
                  );
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
                dispatch(addToPrevious(colorPalette));
                dispatch(
                  getColorPalette(
                    {
                      hexcode: getRandomColor(),
                      mode: modeInput ?? "monochrome",
                    },
                    0
                  )
                );
              }}
            >
              Generate Random
            </Button>
          </div>
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              fontSize: "20px",
              color: colorPalette[0],
            }}
          >
            Previous Color Palettes
          </div>
          {previous.map((colors) => {
            return <ColorContainer colorPalette={colors} main={false} />;
          })}
          {previous.length !== 0 ? (
            <div style={{ marginTop: "30px" }}></div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default MainPage;
