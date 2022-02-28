import classes from "./Button.module.css";

const Button: React.FC<{
	className?: string;
	type?: 'submit' | 'reset' | 'button';
	onClick?: () => void;
	onKeyPress?: () => void;
	disabled?: boolean;
	version?: string;
	shape?: string;
	size?: string;
}> = (props) => {

	const {
		className,
		type,
		onClick,
		onKeyPress,
		disabled,
		version,
		shape,
		size,
	} = props;

	return (
		<button
			className={`${classes.button} ${shape ? classes[shape] : ""} ${
				size ? classes[size] : ""
			} ${version ? classes[version] : ""} ${className}`}
			type={type || "button"}
			onClick={onClick}
			onKeyPress={onKeyPress}
			disabled={disabled || false}
		>
			{props.children}
		</button>
	);
};

export default Button;
