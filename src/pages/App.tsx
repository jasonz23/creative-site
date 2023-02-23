import { useEffect } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "./main-page/MainPage";
import { getColorPalette } from "../api/colorMind";
import { useAppDispatch, useAppSelector } from "../slices";

function App() {
  const dispatch = useAppDispatch();
  const hexcolor = useAppSelector((state) => state?.colorPalette.color.hexcode);
  useEffect(() => {
    dispatch(getColorPalette({ hexcode: hexcolor, mode: "monochrome" }));
  }, []);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
