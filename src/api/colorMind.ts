import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../slices";
import { setColorPalette } from "../slices/colorPalette";
import { apis } from "../static/apis";

export const getColorPalette = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) =>
{
    const response = await fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({
            model: 'default',
            input : [[44,43,44],[90,83,82],"N","N","N"],        
        })
    });
    const data = await handleRes(response);

    dispatch(setColorPalette(data));
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