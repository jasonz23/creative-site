import { useAppSelector } from "../../slices";
import ColorDisplay from "../color-display/ColorDisplay";
import "./ColorContainer.css";
interface PropsState {
  colorPalette: string[];
  main: boolean;
}
const ColorContainer = (props: PropsState) => {
  const colorPalette = useAppSelector(
    (state) => state?.colorPalette?.colorPalette
  );
  return (
    <div
      className="color-container-root"
      style={{ height: props.main ? "250px" : "auto" }}
    >
      {props.colorPalette.map((color, index) => {
        return (
          <ColorDisplay id={index.toString()} color={color} main={props.main} />
        );
      })}
    </div>
  );
};

export default ColorContainer;
