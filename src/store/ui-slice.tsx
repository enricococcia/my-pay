import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		barIsVisible: false,
		notification: {},
		loaderIsVisible: false,
	},
	reducers: {
		showNotification(state, action) {
			state.barIsVisible = true;
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
		clearNotification(state) {
			state.barIsVisible = false;
			state.notification = {};
		},
		toggleLoader(state, action) {
			state.loaderIsVisible = action.payload;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
