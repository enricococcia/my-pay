import SelectOption from "../models/selectOption";
import classes from "./Input.module.css";

type InputProps = { // The common Part
    className?: string;
    id: string;
    placeholder?: string;
    label: string; 
    smallLabel?: string; 
    type: "text" | "password" | "email" | "select" | "number" |  "textarea" | "range" | "date";
	value?: string;
	defaultValue?: string;
	hasError?: boolean;
	onBlur?: () => void;
    onChange?: (e?: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
	options?: SelectOption[];
	required?: boolean;
	validationLabel?: string;
	version?: string;
	rows?: number;
    min?: number;
    max?: number;
    step?: number;
} 

const Input: React.FC<InputProps> = (props) => {
	const {
		className,
		id,
		type,
		label,
        smallLabel,
		value,
		defaultValue,
		hasError,
		onChange,
		onBlur,
		options,
		required,
		validationLabel,
		version,
		rows,
		min,
		max,
		step,
		children,
	} = props;

	const invalidClass = `${classes.control} ${classes.invalid}`;

	let input = (
		<input
			type={type}
			id={id}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			required={required || false}
            min={min}
            max={max}
            step={step}
		/>
	);
	if (type === "select" && options) {
		let optionsList = options.map((item) => {
			return (
				<option value={item.value} key={item.id}>
					{item.label}
				</option>
			);
		});
		input = (
			<select
				id={id}
				defaultValue={defaultValue}
				value={value}
				required={required || false}
                onChange={onChange}
				onBlur={onBlur}
			>
				{optionsList}
			</select>
		);
	}

	if (type === "textarea") {
		input = (
			<textarea
				id={id}
				value={value}
				required={required || false}
				rows={rows || 4}
			>
				{children}
			</textarea>
		);
	}

	return (
		<div
			className={`${hasError ? invalidClass : classes.control} ${
				version ? classes[version] : ""
			} ${className}`}
		>
			<label htmlFor={id}>{label} {smallLabel && <small>{smallLabel}</small>}</label>
			{input}
			{hasError && <p>{validationLabel}</p>}
		</div>
	);
};

export default Input;
