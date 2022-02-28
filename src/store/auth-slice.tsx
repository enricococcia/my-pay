import { createSlice } from "@reduxjs/toolkit";
import { retrieveStoredToken } from "../helper/authHelper";
import User from "../components/models/user";

let initialToken;
const tokenData = retrieveStoredToken();
if (tokenData) {
	initialToken = tokenData.token;
}

const localStorageUser:any = localStorage.getItem("user");

let initialUser:User = JSON.parse(localStorageUser) ? JSON.parse(localStorageUser) : null;

const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: initialToken,
		isLoggedIn: !!initialToken,
		user: initialUser,
	},
	reducers: {
		login(state, action) {
			const expirationTime = action.payload.expirationTime;
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("expirationTime", expirationTime);
			state.token = action.payload.token;
            state.isLoggedIn = expirationTime;
            state.user = action.payload.user[0];
		},
		logout(state) {
			localStorage.removeItem("token");
			localStorage.removeItem("expirationTime");
			localStorage.removeItem("user");
			state.token = null;
			state.isLoggedIn = false;
		},
        edit(state, action) {
            state.user = action.payload.user;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
