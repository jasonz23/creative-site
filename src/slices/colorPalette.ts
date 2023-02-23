import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ColorPaletteState {
    colorPalette: number[][],
}

const initialState: ColorPaletteState = {
    colorPalette: [],

}

const slice = createSlice({
    name: "colorPalette",
    initialState,
    reducers:{
        setColorPalette: (state: ColorPaletteState, {payload}: PayloadAction<number[][]>)=> {
            state.colorPalette = payload;
        }
    }
})

export const {setColorPalette} = slice.actions;

export const colorPalette = slice.reducer;