import { combineReducers } from '@reduxjs/toolkit';
import { colorPalette } from './colorPalette';
import { notification } from './notifications';

export const reducers = combineReducers({colorPalette: colorPalette, notification:notification});
