import { createSlice } from "@reduxjs/toolkit";
import Notification from "../components/models/notification";

const initialNotification: Notification = { status: "", title: "", message: "" };

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    barIsVisible: false,
    notification: initialNotification,
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
      state.notification = initialNotification;
    },
    toggleLoader(state, action) {
      state.loaderIsVisible = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
