import { useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import classes from "./AuthForm.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { validateEmail } from "../../helper/authHelper";
import { authUser } from "../../lib/apiUser";

const AuthForm = () => {
	const dispatch = useDispatch();
	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput((value) => validateEmail(value), "");

	const {
		value: enteredPassword,
		isValid: enteredPasswordIsValid,
		hasError: passwordInputHasError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPassword,
	} = useInput(
		(value) => value.trim() !== "" && value.trim().length > 8,
		""
	);

	const [isLogin, setIsLogin] = useState(true);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!enteredEmailIsValid || !enteredPasswordIsValid) {
			return;
		}
		dispatch(authUser(isLogin, enteredEmail, enteredPassword));
		resetEmail();
		resetPassword();
	};

	let formIsValid = false;

	if (enteredPasswordIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
				<Input
					id="email"
					type="email"
					label="Your Email"
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					hasError={emailInputHasError}
					validationLabel="Please insert a valid email."
					required
				/>
				<Input
					id="password"
					type="password"
					label="Your Password"
					value={enteredPassword}
					onChange={passwordChangeHandler}
					onBlur={passwordBlurHandler}
					hasError={passwordInputHasError}
					validationLabel="Please insert a valid password( at least 8 chars )."
					required
				/>
				<div className={classes.actions}>
					<Button
						type="submit"
						disabled={!formIsValid}
						className={classes.submit}
					>
						{isLogin ? "Login" : "Create Account"}
					</Button>
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin
							? "Create new account"
							: "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
