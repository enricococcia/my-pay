import { useSelector, useDispatch } from "react-redux";
import { editUserData } from "../../lib/apiUser";
import useInput from "../../hooks/use-input";
import { TextField, Button, Slider } from "@mui/material";
import classes from "./UserForm.module.css";
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
      budget: enteredBudget.toString(),
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
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          className={classes.userEditControl}
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameInputHasError}
          helperText={nameInputHasError && "Please insert a valid name"}
          required
        />

        <TextField
          id="username"
          label="Username"
          variant="outlined"
          className={classes.userEditControl}
          value={enteredUserName}
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
          error={userNameInputHasError}
          helperText={userNameInputHasError && "Please insert a valid username"}
          required
        />
        <div className={classes.progressBudgetContainer}>
          <p>Insert your budget - {+enteredBudget}€ {budgetInputHasError && <small>Enter a valid budget</small>}</p>
          <Slider
            aria-label="Monthly Budget"
            id="budget"
            min={0}
            max={1000}
            step={1}
            value={parseInt(enteredBudget)}
            className={classes.userEditControl}
            onChange={budgetChangeHandler}
            onBlur={budgetBlurHandler}
            valueLabelDisplay="auto"
            sx={{
              color: "var(--color-primary)",
            }}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            variant="contained"
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
