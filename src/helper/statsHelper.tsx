export const checkBetweenDate = (date: Date, days: number) => {
	const today = new Date();

	const diffTime = today.getTime() - date.getTime();
	var diffDays = diffTime / (1000 * 3600 * 24);
	if (diffDays <= days) {
		return true;
	}
	return false;
} 

export const toFixedNumber = (num: number, digits: number) => {
	let newNumber = num.toFixed(digits);
	return +newNumber;
}