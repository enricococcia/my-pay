import { configureStore } from "@reduxjs/toolkit";
//import { useDispatch } from "react-redux";

import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";

const store = configureStore({
	reducer: { ui: uiSlice.reducer, auth: authSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch;
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
