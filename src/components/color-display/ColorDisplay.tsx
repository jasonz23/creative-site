import PaletteIcon from "@mui/icons-material/Palette";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAppDispatch } from "../../slices";
import { setColor, swapColorPaletteIndex } from "../../slices/colorPalette";
import { useEffect, useRef, useState } from "react";
import { Input } from "@mui/material";

interface ColorDisplayState {
  id: string;
  color: string;
}

const ColorDisplay = (props: ColorDisplayState): JSX.Element => {
  const [showInput, setShowInput] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();

        // 👇️ your logic here
        setShowInput(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div
      key={props.id}
      style={{
        flex: 1,
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: props.color,
          width: "100%",
          height: "160px",
        }}
      ></div>
      {showInput ? (
        <Input
          value={props.color}
          style={{ color: "white" }}
          autoFocus
          onChange={(e) => {
            dispatch(
              setColor({ index: parseInt(props.id), color: e.target.value })
            );
          }}
        />
      ) : (
        <div
          style={{ color: "white" }}
          onClick={() => {
            setShowInput(true);
          }}
        >
          {props.color}
        </div>
      )}
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          marginTop: "5px",
        }}
      >
        <PaletteIcon
          onClick={() => {
            setShowInput(!showInput);
          }}
          style={{ cursor: "pointer" }}
        />

        <ContentCopyIcon
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(props.color);
            } catch (err) {
              console.error(err);
            }
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div>
        <ChevronLeftIcon
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => {
            dispatch(
              swapColorPaletteIndex({ index: parseInt(props.id), swap: false })
            );
          }}
        />
        <ChevronRightIcon
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => {
            dispatch(
              swapColorPaletteIndex({ index: parseInt(props.id), swap: true })
            );
          }}
        />
      </div>
      <div>
        <p style={{ color: "white" }}>Color {props.id}</p>
      </div>
    </div>
  );
};

export default ColorDisplay;
