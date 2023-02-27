import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
    loadingIcon: boolean,
    errorMessage: string,
    blurLoadingIcon: boolean,
}

const initialState: NotificationState = {
    loadingIcon: false,
    errorMessage: "",
    blurLoadingIcon: false,

}

const slice = createSlice({
    name: "notification",
    initialState,
    reducers:{
        setLoadingIcon: (state: NotificationState, {payload}: PayloadAction<boolean>)=> {
            state.loadingIcon = payload;
        },
        setErrorMessage: (state: NotificationState, {payload}: PayloadAction<string>)=> {
            state.errorMessage = payload;
        },
        setBlurLoadingIcon: (state: NotificationState, {payload}: PayloadAction<boolean>)=> {
            state.blurLoadingIcon = payload;
        },
    }
})

export const {setLoadingIcon, setErrorMessage, setBlurLoadingIcon} = slice.actions;

export const notification = slice.reducer;