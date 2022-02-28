import { FIREBASE_DOMAIN, FB_API_KEY } from "../const";
import { uiActions } from "../store/ui-slice";
import { authActions } from "../store/auth-slice";
import { retrieveStoredToken } from "../helper/authHelper";
import User from "../components/models/user";

let messageError = "Unknown Error";
//https://stackoverflow.com/questions/67936743/what-type-should-be-used-with-async-dispatch

export const authUser = (isLogin: boolean, email: string, password: string) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			let url;
			if (isLogin) {
				url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FB_API_KEY}`;
			} else {
				url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FB_API_KEY}`;
			}
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			});

			if (!response.ok) {
				throw new Error("Authentication failed!");
			}

			const data = await response.json();

			return data;
		};

		try {
			const userData = await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			const expirationTime = new Date(
				new Date().getTime() + +userData.expiresIn * 1000
			);
			if (!isLogin) {
				dispatch(sendUserData(userData.idToken, email));
				setTimeout(() => {
					dispatch(
						fetchUserData(email, userData.idToken, expirationTime)
					);
				}, 0);
			} else {
				dispatch(
					fetchUserData(email, userData.idToken, expirationTime)
				);
			}
		} catch (error) {
			if (error instanceof Error) messageError = error.message;
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: messageError,
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};

export const fetchUserData = (
	email: string,
	token: string,
	expirationTime: Date
) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`${FIREBASE_DOMAIN}/users.json?auth=${token}`
			);

			if (!response.ok) {
				throw new Error("Could not fetch users from database!");
			}

			const data = await response.json();

			return data;
		};

		try {
			const usersData = await sendRequest();
			dispatch(uiActions.toggleLoader(false));

			const transformedUsers = [];

			for (const key in usersData) {
                if(usersData[key].email === email){
                    usersData[key].uid = key;
                }
				const userObj = {
					...usersData[key],
				};
				transformedUsers.push(userObj);
			}
			const userData = transformedUsers.filter(
				(obj) => obj.email === email
			);
			localStorage.setItem("user", JSON.stringify(userData));

			dispatch(
				authActions.login({
					token: token,
					expirationTime: expirationTime.toISOString(),
					user: userData,
				})
			);
		} catch (error) {
			if (error instanceof Error) messageError = error.message;
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: messageError,
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};

export const sendUserData = (idToken: string, email: string) => {
	return async (dispatch: any): Promise<void> => {
		let mailSplit = email.split("@");

		const newUser = {
			uid: "",
			id: idToken,
			email: email,
			name: "User",
			userName: mailSplit[0],
			budget: "100",
		};

		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`${FIREBASE_DOMAIN}/users.json?auth=${idToken}`,
				{
					method: "POST",
					body: JSON.stringify(newUser),
				}
			);

			if (!response.ok) {
				throw new Error("Sending user data failed.");
			}
		};

		try {
			await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Creation user successfully!",
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		} catch (error) {
			if (error instanceof Error) messageError = error.message;
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: messageError,
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};

export const editUserData = (data: User) => {
	return async (dispatch: any): Promise<void> => {
		const newUser = {
			uid: data.uid,
			id: data.id,
			email: data.email,
			name: data.name,
			userName: data.userName,
			budget: data.budget,
		};
        
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`${FIREBASE_DOMAIN}/users/${data.uid}.json?auth=${
					retrieveStoredToken()?.token
				}`,
				{
					method: "PUT",
					body: JSON.stringify(newUser),
				}
			);

			if (!response.ok) {
				throw new Error("Sending user data failed.");
			}
		};

		try {
			await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			localStorage.setItem("user", JSON.stringify(newUser));

			dispatch(
				authActions.edit({
					user: newUser,
				})
			);

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Edit user successfully!",
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		} catch (error) {
			if (error instanceof Error) messageError = error.message;
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: messageError,
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};

export const deleteUser = (idUser: string, idToken: string) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`${FIREBASE_DOMAIN}/users/${idUser}.json?auth=${
					retrieveStoredToken()?.token
				}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error("Deleting user data failed.");
			}
		};

		try {
			await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			dispatch(authActions.logout());
			dispatch(deleteFromFirebase(idToken));
		} catch (error) {
			if (error instanceof Error) messageError = error.message;
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: messageError,
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};

export const deleteFromFirebase = (idToken: string) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${FB_API_KEY}`,
				{
					method: "POST",
					body: JSON.stringify({
						idToken: idToken,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Deleting user data failed.");
			}
		};
		try {
			await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Delete user successfully!",
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		} catch (error) {
			if (error instanceof Error) messageError = error.message;
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: messageError,
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};

export const changePasswordUser = (userData: User, password: string) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FB_API_KEY}`,
				{
					method: "POST",
					body: JSON.stringify({
						idToken: userData.id,
						password: password,
						returnSecureToken: false,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				return response.json();
			} else {
				return response.json().then((data) => {
					let errorMessage = "Changing password failed!";
					if (data && data.error && data.error.message) {
						errorMessage = data.error.message;
					}

					throw new Error(errorMessage);
				});
			}
		};
		try {
			await sendRequest().then((data) => {
				const dataToSave = {
					uid: userData.uid,
					id: data.idToken,
					email: userData.email,
					name: userData.name,
					userName: userData.userName,
					budget: userData.budget,
				};
                console.log(dataToSave);
				dispatch(editUserData(dataToSave));
				dispatch(
					uiActions.showNotification({
						status: "success",
						title: "Success!",
						message: "Change user password successfully!",
					})
				);
				setTimeout(() => {
					dispatch(uiActions.clearNotification());
				}, 3000);
			});
			dispatch(uiActions.toggleLoader(false));
		} catch (error) {
			if (error instanceof Error) messageError = error.message;
			dispatch(uiActions.toggleLoader(false));
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: messageError,
				})
			);
			setTimeout(() => {
				dispatch(uiActions.clearNotification());
			}, 3000);
		}
	};
};
