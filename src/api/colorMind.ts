import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../slices";
import { ColorState, setColorPalette } from "../slices/colorPalette";
import { setBlurLoadingIcon, setLoadingIcon } from "../slices/notifications";

export const getColorPalette = (color: ColorState, time: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) =>
{
    // If inital call then show loading icon
    if (time !== 0){
        dispatch(setLoadingIcon(true));
    } else {
        dispatch(setBlurLoadingIcon(true));
    }

    // If not intial call then show blur loading icon
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${color.hexcode}&mode=${color.mode}&count=5`, {
        method: 'GET'
    });
    const data = await handleRes(response);
    dispatch(setColorPalette(data.colors));
    if (time !== 0) { setTimeout(() => {
        dispatch(setLoadingIcon(false));
    }, time);
    } else {
        dispatch(setBlurLoadingIcon(false));
    }
    
}

const handleRes = async (res: any) => {
    if (res.status < 400) {
        return await res.json();
        
    } else if (res.status === 401) {
        const e = new Error(`missing valid x-client-token header`);
        throw e
    } else {
        const e = new Error(`status:${res.status}`);
        throw e
        
    }
}