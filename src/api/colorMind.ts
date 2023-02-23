import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../slices";
import { ColorState, setColorPalette } from "../slices/colorPalette";
import { setLoadingIcon } from "../slices/notifications";
import { apis } from "../static/apis";

export const getColorPalette = (color: ColorState): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) =>
{
    dispatch(setLoadingIcon(true));
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${color.hexcode}&mode=${color.mode}&count=5`, {
        method: 'GET'
    });
    const data = await handleRes(response);
    dispatch(setColorPalette(data.colors));
    dispatch(setLoadingIcon(false));
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