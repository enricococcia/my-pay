import { useSelector } from "react-redux";
import useInput from "../../hooks/use-input";
import SelectOption from "../models/selectOption";
import classes from "./NewExpenseForm.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Expense from "../models/expense";
import { RootState } from "../../store";

const NewExpenseForm: React.FC<{ onSubmit: (data: {}) => void }> = (props) => {
    
	const userData = useSelector((state:RootState) => state.auth.user);
	const {
		value: enteredTitle,
		isValid: enteredTitleIsValid,
		hasError: titleInputHasError,
		valueChangeHandler: titleChangeHandler,
		inputBlurHandler: titleBlurHandler,
		reset: resetTitle,
	} = useInput((value) => value.trim().length < 40, "");

    const {
		value: enteredDate,
		isValid: enteredDateIsValid,
		hasError: dateInputHasError,
		valueChangeHandler: dateChangeHandler,
		inputBlurHandler: dateBlurHandler,
		reset: resetDate,
	} = useInput((value) => value.trim() !== "", "");

	const {
		value: enteredType,
		isValid: enteredTypeIsValid,
		hasError: typeInputHasError,
		valueChangeHandler: typeChangeHandler,
		inputBlurHandler: typeBlurHandler,
		reset: resetType,
	} = useInput((value) => value.trim() !== "", "");

	const {
		value: enteredCost,
		isValid: enteredCostIsValid,
		hasError: costInputHasError,
		valueChangeHandler: costChangeHandler,
		inputBlurHandler: costBlurHandler,
		reset: resetCost,
	} = useInput((value) => +value > 0, "");

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (
			!enteredTitleIsValid ||
			!enteredTypeIsValid ||
			!enteredCostIsValid ||
            !enteredDateIsValid
		) {
			return;
		}
		const dataToSave = new Expense(enteredTitle, new Date(enteredDate), enteredType, enteredCost, userData.uid,);

		props.onSubmit(dataToSave);
		resetTitle();
		resetDate();
		resetType();
		resetCost();
	};

	let formIsValid = false;

	if (enteredTitleIsValid && enteredDateIsValid && enteredTypeIsValid && enteredCostIsValid) {
		formIsValid = true;
	}

	return (
		<section className={classes.newExpense}>
			<h1>Add a new expense</h1>
			<form onSubmit={submitHandler}>
				<Input
					id="title"
					type="text"
					label="Title"
                    smallLabel="Enter a title"
					value={enteredTitle}
					onChange={titleChangeHandler}
					onBlur={titleBlurHandler}
					hasError={titleInputHasError}
					validationLabel="Please insert a valid title."
					required
				/>
                <Input
					id="date"
					type="date"
					label="Date"
                    smallLabel="Choose a date"
					defaultValue={enteredDate}
					onChange={dateChangeHandler}
					onBlur={dateBlurHandler}
					hasError={dateInputHasError}
					validationLabel="Please insert a valid date."
					required
				/>
				<Input
					id="type"
					type="select"
					label="Type"
                    smallLabel="Choose a type"
					defaultValue={enteredType}
					onChange={typeChangeHandler}
					onBlur={typeBlurHandler}
					hasError={typeInputHasError}
					validationLabel="Please insert a valid type."
					options={[
						new SelectOption("0", "", ""),
						new SelectOption("1", "food-drink", "Food and drink"),
						new SelectOption("2", "hobbies", "Hobbies"),
						new SelectOption("3", "clothes", "Clothes"),
						new SelectOption("4", "market", "Market"),
						new SelectOption("5", "online", "Shopping Online"),
						new SelectOption("6", "other", "Other"),
					]}
					required
				/>
				<Input
					id="cost"
					type="number"
					label="Cost"
                    smallLabel="Enter the cost (€)"
					value={enteredCost}
					onChange={costChangeHandler}
					onBlur={costBlurHandler}
					hasError={costInputHasError}
					validationLabel="Please insert a valid cost."
					required
				/>
				<div className={classes.actions}>
					<Button
						type="submit"
						version="secondary"
						disabled={!formIsValid}
						className={classes.submit}
					>
						Save
					</Button>
				</div>
			</form>
		</section>
	);
};

export default NewExpenseForm;
