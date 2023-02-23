import { combineReducers } from '@reduxjs/toolkit';
import { colorPalette } from './colorPalette';

export const reducers = combineReducers({colorPalette: colorPalette});
