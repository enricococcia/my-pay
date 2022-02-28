import classes from "./Backdrop.module.css";

const Backdrop: React.FC<{
	className?: string;
	onClose: () => void;
}> = (props) => {
	return (
		<>
			<div
				className={`${classes.backdrop} ${props.className}`}
				onClick={props.onClose}
			>
				{props.children}
			</div>
		</>
	);
};

export default Backdrop;
