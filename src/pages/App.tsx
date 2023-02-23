import React, { useEffect } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "./main-page/MainPage";
import { getColorPalette } from "../api/colorMind";
import { useAppDispatch } from "../slices";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getColorPalette());
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
