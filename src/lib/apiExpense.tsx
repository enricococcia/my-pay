import { FIREBASE_DOMAIN } from "../const";
import { uiActions } from "../store/ui-slice";
import { retrieveStoredToken } from "../helper/authHelper";
import { checkBetweenDate } from "../helper/statsHelper";
import UserStats from "../components/models/userStats";
let messageError = "Unknown Error";

export const getUserStats = (
	userId: string,
	callback?: (dataLoaded: UserStats) => void
) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`${FIREBASE_DOMAIN}/expenses.json?auth=${
					retrieveStoredToken()?.token
				}`
			);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(
					data.message || "Could not fetch expenses for this user."
				);
			}

			let transformedExpenses = [];
			for (const key in data) {
				data[key].eid = key;
				const expenseObj = {
					...data[key],
				};
			
				if (expenseObj.userId === userId) {
					transformedExpenses.push(expenseObj);
				}
			}

			let todayExpenses = [];
			let todayExpensesValue = 0;
			let weekExpenses = [];
			let weekExpensesValue = 0;
			let monthExpenses = [];
			let monthExpensesValue = 0;

			for (const element of transformedExpenses) {
				let date = new Date(element.date);
				if (checkBetweenDate(date, 1)) {
					todayExpenses.push(element);
					todayExpensesValue =
						todayExpensesValue + parseFloat(element.cost);
				}
				if (checkBetweenDate(date, 7)) {
					weekExpenses.push(element);
					weekExpensesValue =
						weekExpensesValue + parseFloat(element.cost);
				}
				if (checkBetweenDate(date, 30)) {
					monthExpenses.push(element);
					monthExpensesValue =
						monthExpensesValue + parseFloat(element.cost);
				}
			}

			let foodDrinkExpensesValue = 0;
			const expensesFoodAndDrinkResult = transformedExpenses.filter(
				(item) => item.type === "food-drink"
			);
			for (const element of expensesFoodAndDrinkResult) {
				foodDrinkExpensesValue =
					foodDrinkExpensesValue + parseFloat(element.cost);
			}

			let hobbiesExpensesValue = 0;
			const expensesHobbiesResult = transformedExpenses.filter(
				(item) => item.type === "hobbies"
			);
			for (const element of expensesHobbiesResult) {
				hobbiesExpensesValue =
					hobbiesExpensesValue + parseFloat(element.cost);
			}

			let clothesExpensesValue = 0;
			const expensesClothesResult = transformedExpenses.filter(
				(item) => item.type === "clothes"
			);
			for (const element of expensesClothesResult) {
				clothesExpensesValue =
					clothesExpensesValue + parseFloat(element.cost);
			}

			let marketExpensesValue = 0;
			const expensesMarketResult = transformedExpenses.filter(
				(item) => item.type === "market"
			);
			for (const element of expensesMarketResult) {
				marketExpensesValue =
					marketExpensesValue + parseFloat(element.cost);
			}

			let onlineExpensesValue = 0;
			const expensesOnlineResult = transformedExpenses.filter(
				(item) => item.type === "online"
			);
			for (const element of expensesOnlineResult) {
				onlineExpensesValue =
					onlineExpensesValue + parseFloat(element.cost);
			}

			let otherExpensesValue = 0;
			const expensesOtherResult = transformedExpenses.filter(
				(item) => item.type === "other"
			);
			for (const element of expensesOtherResult) {
				otherExpensesValue =
					otherExpensesValue + parseFloat(element.cost);
			}

			return {
				result: transformedExpenses,
				today: { result: todayExpenses, value: todayExpensesValue },
				week: { result: weekExpenses, value: weekExpensesValue },
				month: { result: monthExpenses, value: monthExpensesValue },
				info: {
					foodDrink: {
						result: expensesFoodAndDrinkResult,
						value: foodDrinkExpensesValue,
					},
					hobbies: {
						result: expensesHobbiesResult,
						value: hobbiesExpensesValue,
					},
					clothes: {
						result: expensesClothesResult,
						value: clothesExpensesValue,
					},
					market: {
						result: expensesMarketResult,
						value: marketExpensesValue,
					},
					online: {
						result: expensesOnlineResult,
						value: onlineExpensesValue,
					},
					other: {
						result: expensesOtherResult,
						value: otherExpensesValue,
					},
				},
			};
		};

		try {
			const dataLoaded = await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			if (callback) {
				callback(dataLoaded);
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

export const addExpense = (expenseData: {}, callback?: () => void) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`${FIREBASE_DOMAIN}/expenses.json?auth=${
					retrieveStoredToken()?.token
				}`,
				{
					method: "POST",
					body: JSON.stringify(expenseData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Could not create expense.");
			}

			return null;
		};
		try {
			await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			if (callback) {
				callback();
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

export const deleteExpense = (id: string, callback?: () => void) => {
	return async (dispatch: any): Promise<void> => {
		const sendRequest = async () => {
			dispatch(uiActions.toggleLoader(true));
			const response = await fetch(
				`${FIREBASE_DOMAIN}/expenses/${id}.json?auth=${
					retrieveStoredToken()?.token
				}`,
				{
					method: "DELETE",
				}
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Could not delete expense.");
			}

			return null;
		};
		try {
			await sendRequest();
			dispatch(uiActions.toggleLoader(false));
			if (callback) {
				callback();
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
