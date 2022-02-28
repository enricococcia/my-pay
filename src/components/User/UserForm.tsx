import { useSelector, useDispatch } from "react-redux";
import { editUserData } from "../../lib/apiUser";
import useInput from "../../hooks/use-input";
import classes from "./UserForm.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { RootState } from "../../store";

const UserForm = () => {
	const userData = useSelector((state: RootState) => state.auth.user);
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value) => value.trim() !== "", userData.name || "");

	const {
		value: enteredUserName,
		isValid: enteredUserNameIsValid,
		hasError: userNameInputHasError,
		valueChangeHandler: userNameChangeHandler,
		inputBlurHandler: userNameBlurHandler,
	} = useInput((value) => value.trim() !== "", userData.userName || "");

	const {
		value: enteredBudget,
		isValid: enteredBudgetIsValid,
		hasError: budgetInputHasError,
		valueChangeHandler: budgetChangeHandler,
		inputBlurHandler: budgetBlurHandler,
	} = useInput((value) => +value > 0, userData.budget || "");

	const dispatch = useDispatch();

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (
			!enteredNameIsValid ||
			!enteredUserNameIsValid ||
			!enteredBudgetIsValid
		) {
			return;
		}

		const dataToSave = {
			uid: userData.uid,
			id: userData.id,
			email: userData.email,
			name: enteredName,
			userName: enteredUserName,
			budget: enteredBudget,
		};
		dispatch(editUserData(dataToSave));
	};

	let formIsValid = false;

	if (enteredNameIsValid && enteredUserNameIsValid) {
		formIsValid = true;
	}

	return (
		<div className={classes.user}>
			<h3>Edit profile</h3>
			<form onSubmit={submitHandler}>
				<Input
					id="name"
					type="text"
					label="Name"
					className={classes.userEditControl}
					value={enteredName}
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
					hasError={nameInputHasError}
					validationLabel="Please insert a valid name."
					required
				/>
				<Input
					id="username"
					type="text"
					label="Username"
					className={classes.userEditControl}
					value={enteredUserName}
					onChange={userNameChangeHandler}
					onBlur={userNameBlurHandler}
					hasError={userNameInputHasError}
					validationLabel="Please insert a valid username."
					required
				/>
                <div className={classes.progressBudgetContainer}>
                    <div className={classes.progressBudget} style={{width: `${+enteredBudget/10}%`}}>  </div>
                    <Input
                        id="budget"
                        type="range"
                        label={`Monthly Budget - ${enteredBudget}€ / 1000€`} 
                        min={0}
                        max={1000}
                        step={1}
                        className={classes.userEditControl}
                        value={enteredBudget}
                        onChange={budgetChangeHandler}
                        onBlur={budgetBlurHandler}
                        hasError={budgetInputHasError}
                        validationLabel="Please insert a valid budget."
                        required
                    />
                </div>
				<div className={classes.actions}>
					<Button
						type="submit"
						disabled={!formIsValid}
						className={classes.submit}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default UserForm;
