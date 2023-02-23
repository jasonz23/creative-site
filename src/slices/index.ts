import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { reducers} from "./reducers";

const store = configureStore({
    reducer: reducers,
})

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof reducers>

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


