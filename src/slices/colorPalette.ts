import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ColorState {
    hexcode: string,
    mode: string
}

interface ColorPaletteState {
    colorPalette: string[],
    color: ColorState
}

interface SwapColorPalettePayloadState {
    index: number,
    swap: boolean
}

interface SetColorPayloadState {
    index: number,
    color: string
}

const initialState: ColorPaletteState = {
    colorPalette: [],
    color: {hexcode:getRandomColor(), mode:"monochrome"}
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const slice = createSlice({
    name: "colorPalette",
    initialState,
    reducers:{
        setColorPalette: (state: ColorPaletteState, {payload}: PayloadAction<object[]>) => {
            const newPayload:string[] = payload?.map((color: any) => {
                return color.hex.value;
            })
            state.colorPalette = newPayload;
        },
        swapColorPaletteIndex: (state: ColorPaletteState, {payload}: PayloadAction<SwapColorPalettePayloadState>) => {
            let colorPaletteCopy = [...state.colorPalette];
            if (payload.swap) {
                if (payload.index != 4) {
                    const temp = colorPaletteCopy[payload.index]
                    colorPaletteCopy[payload.index] = colorPaletteCopy[payload.index + 1]
                    colorPaletteCopy[payload.index + 1] = temp
                } else {
                    const colorElement = colorPaletteCopy.pop()!;
                    colorPaletteCopy.unshift(colorElement);
                }
            } else {
                if (payload.index != 0) {
                    const temp = colorPaletteCopy[payload.index]
                    colorPaletteCopy[payload.index] = colorPaletteCopy[payload.index - 1]
                    colorPaletteCopy[payload.index - 1] = temp
                } else {
                    const colorElement = colorPaletteCopy[0];
                    colorPaletteCopy = colorPaletteCopy.splice(1,colorPaletteCopy.length);
                    colorPaletteCopy.push(colorElement);
                }
            }
            state.colorPalette = colorPaletteCopy;
        },
        setColor: (state: ColorPaletteState, {payload}: PayloadAction<SetColorPayloadState>) => {
            state.colorPalette[payload.index] = payload.color;
        },
        setHexCode: (state: ColorPaletteState, {payload}: PayloadAction<string>) => {
            state.color.hexcode = payload;
        },
        setMode: (state: ColorPaletteState, {payload}: PayloadAction<string>) => {
            state.color.mode = payload;
        },
        setRandomColor: (state: ColorPaletteState) => {
            state.color.hexcode = getRandomColor();
        },
    }
})

export const {setColorPalette, swapColorPaletteIndex, setColor, setRandomColor, setMode, setHexCode} = slice.actions;

export const colorPalette = slice.reducer;