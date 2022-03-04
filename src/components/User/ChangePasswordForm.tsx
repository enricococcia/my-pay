import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import { changePasswordUser } from "../../lib/apiUser";
import { Button, TextField } from "@mui/material";

import classes from "./UserForm.module.css";
import { RootState } from "../../store";

const ChangePasswordForm: React.FC<{
  toggleModalEditHandler: (isOpen: boolean) => void;
}> = (props) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length > 8, "");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!enteredPasswordIsValid) {
      return;
    }

    setIsLoading(true);

    dispatch(changePasswordUser(userData, enteredPassword));

    setIsLoading(false);
  };

  let formIsValid = false;

  if (enteredPasswordIsValid) {
    formIsValid = true;
  }

  return (
    <form onSubmit={submitHandler}>
      <TextField
        id="passwordchange"
        type="password"
        label="Password"
        variant="outlined"
		className={classes.passwordFormControl}
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        error={passwordInputHasError}
        helperText={
          passwordInputHasError &&
          "Please insert a valid password( at least 8 chars )."
        }
        required
      />

      <div className={classes.modalActions}>
        <Button
          variant="text"
          onClick={() => props.toggleModalEditHandler(false)}
        >
          Back
        </Button>
        {!isLoading && (
          <Button
            type="submit"
            variant="contained"
            disabled={!formIsValid}
            className={classes.submit}
          >
            Save
          </Button>
        )}
        {isLoading && <div className={classes.loader}></div>}
      </div>
    </form>
  );
};

export default ChangePasswordForm;
