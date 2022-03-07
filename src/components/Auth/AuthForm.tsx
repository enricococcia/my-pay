import { useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import classes from "./AuthForm.module.css";
import { Button, Paper, TextField } from "@mui/material";
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
  } = useInput((value) => validateEmail(value));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 8);

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
    <Paper className={classes.auth}>
      <h3>{isLogin ? "Login" : "Sign Up"}</h3>
      <form onSubmit={submitHandler}>
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          value={enteredEmail}
		  className={classes.authControl}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailInputHasError}
          helperText={emailInputHasError && "Please insert a valid email."}
          required
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          value={enteredPassword}
		      className={classes.authControl}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordInputHasError}
          helperText={
            passwordInputHasError &&
            "Please insert a valid password( at least 8 chars )."
          }
          required
        />

        <div className={classes.actions}>
          <Button type="submit" variant="contained" disabled={!formIsValid}>
            {isLogin ? "Login" : "Create Account"}
          </Button>
          <Button className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default AuthForm;
