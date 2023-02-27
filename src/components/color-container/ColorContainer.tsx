import { useAppSelector } from "../../slices";
import ColorDisplay from "../color-display/ColorDisplay";
import "./ColorContainer.css";
interface PropsState {
  colorPalette: string[];
  main: boolean;
}
const ColorContainer = (props: PropsState) => {
  const blurLoadingState = useAppSelector(
    (state) => state?.notification?.blurLoadingIcon
  );
  return (
    <>
      {blurLoadingState && props.main ? (
        <div
          style={{
            position: "fixed",
            zIndex: "500",
            marginLeft: "auto",
            marginTop: "20vh",
          }}
        >
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
      ) : null}
      <div
        className="color-container-root"
        style={{
          height: props.main ? "250px" : "auto",
          filter: blurLoadingState && props.main ? "blur(8px)" : "",
        }}
      >
        {props.colorPalette.map((color, index) => {
          return (
            <ColorDisplay
              id={index.toString()}
              color={color}
              main={props.main}
            />
          );
        })}
      </div>
    </>
  );
};

export default ColorContainer;
