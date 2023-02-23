import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ColorPaletteState {
    colorPalette: string[],
}

interface SwapColorPalettePayloadState {
    index: number,
    swap: boolean
}

interface APIColorPaletteState {
    
}

interface SetColorPayloadState {
    index: number,
    color: string
}

const initialState: ColorPaletteState = {
    colorPalette: [],
}

const slice = createSlice({
    name: "colorPalette",
    initialState,
    reducers:{
        setColorPalette: (state: ColorPaletteState, {payload}: PayloadAction<object[]>) => {
            console.log(payload)
            const newPayload:string[] = payload?.map((color: any) => {
                return color.hex.value;
            })
            console.log(newPayload);
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
            console.log(colorPaletteCopy)
            state.colorPalette = colorPaletteCopy;
        },
        setColor: (state: ColorPaletteState, {payload}: PayloadAction<SetColorPayloadState>) => {
            state.colorPalette[payload.index] = payload.color;
        }
    }
})

export const {setColorPalette, swapColorPaletteIndex, setColor} = slice.actions;

export const colorPalette = slice.reducer;