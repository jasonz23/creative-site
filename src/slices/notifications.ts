import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
    loadingIcon: boolean,
    errorMessage: string
}

const initialState: NotificationState = {
    loadingIcon: false,
    errorMessage: ""

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
    }
})

export const {setLoadingIcon, setErrorMessage} = slice.actions;

export const notification = slice.reducer;