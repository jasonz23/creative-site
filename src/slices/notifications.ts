import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
    loadingIcon: boolean,
}

const initialState: NotificationState = {
    loadingIcon: false,

}

const slice = createSlice({
    name: "notification",
    initialState,
    reducers:{
        setLoadingIcon: (state: NotificationState, {payload}: PayloadAction<boolean>)=> {
            state.loadingIcon = payload;
        }
    }
})

export const {setLoadingIcon} = slice.actions;

export const notification = slice.reducer;