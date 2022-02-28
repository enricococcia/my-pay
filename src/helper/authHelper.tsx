export const calculateRemainingTime = (expirationTime: any) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();
	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

export const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem("token");
	const storedExpirationDate = localStorage.getItem("expirationTime");
	const remainingTime = calculateRemainingTime(storedExpirationDate);
	if (remainingTime <= 3600) {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
	};
};

export const validateEmail = (email:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}