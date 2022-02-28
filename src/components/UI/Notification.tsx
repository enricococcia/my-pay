import classes from "./Notification.module.css";

const Notification: React.FC<{
	notification: { status?: string; title?: string; message?: string };
}> = (props) => {
	const { notification } = props;

	let specialClasses = "";

	if (notification.status === "error") {
		specialClasses = classes.error;
	}
	if (notification.status === "success") {
		specialClasses = classes.success;
	}

	const cssClasses = `${classes.notification} ${specialClasses}`;

	return (
		<section className={cssClasses}>
			<div className="container">
				<div className={classes.notification}>
					<h2>{notification.title}</h2>
					<p>{notification.message}</p>
				</div>
			</div>
		</section>
	);
};

export default Notification;
