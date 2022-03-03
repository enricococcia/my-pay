export const checkBetweenDate = (date: Date, days: number) => {
	const today = new Date();

	const diffTime = today.getTime() - date.getTime();
	var diffDays = diffTime / (1000 * 3600 * 24);
	if (diffDays <= days) {
		return true;
	}
	return false;
} 
