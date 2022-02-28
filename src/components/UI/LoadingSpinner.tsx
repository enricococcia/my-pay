import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
	return (
		<div className={classes.loaderContainer}>
			<div className={classes.spinner}></div>
		</div>
	);
};

export default LoadingSpinner;
