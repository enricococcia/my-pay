export const isToday = (date: Date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export const isThisWeek = (date: Date) => {
	const myDate = date;
	const today = new Date();

	const diffTime = today.getTime() - myDate.getTime();
	var diffDays = diffTime / (1000 * 3600 * 24);
	if (diffDays <= 7) {
		return true;
	}
	return false;
};

export const isThisMonth = (date: Date) => {
	const today = new Date();
	return (
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};
