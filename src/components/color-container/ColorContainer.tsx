import { useAppSelector } from "../../slices";
import ColorDisplay from "../color-display/ColorDisplay";
import "./ColorContainer.css";
const ColorContainer = () => {
  const colorPalette = useAppSelector(
    (state) => state?.colorPalette?.colorPalette
  );
  return (
    <div className="color-container-root">
      {colorPalette.map((color, index) => {
        return <ColorDisplay id={index.toString()} color={color} />;
      })}
    </div>
  );
};

export default ColorContainer;
