import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../slices";
import { setColorPalette } from "../slices/colorPalette";
import { setLoadingIcon } from "../slices/notifications";
import { apis } from "../static/apis";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export const getColorPalette = (color: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) =>
{
    let c = color.replace("#","");
    if (color === "-1") {
        c = getRandomColor()
    }

    dispatch(setLoadingIcon(true));
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${c}&mode=monochrome&count=5`, {
        method: 'GET'
    });
    const data = await handleRes(response);
    console.log('res', data)
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