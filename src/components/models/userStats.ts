import Expense from "./expense";

class UserStats {
	result: Expense[];
	today: { result: Expense[]; value: number };
	week: { result: Expense[]; value: number };
	month: { result: Expense[]; value: number };
	info?: {
		foodDrink: { result: Expense[]; value: number };
		hobbies: { result: Expense[]; value: number };
		clothes: { result: Expense[]; value: number };
		market: { result: Expense[]; value: number };
		online: { result: Expense[]; value: number };
		other: { result: Expense[]; value: number };
	};

	constructor(
		result: Expense[],
		today: { result: Expense[]; value: number },
		week: { result: Expense[]; value: number },
		month: { result: Expense[]; value: number }
	) {
		this.result = result;
		this.today = today;
		this.week = week;
		this.month = month;
	}
}

export default UserStats;
