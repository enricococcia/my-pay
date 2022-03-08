import { useSelector, useDispatch } from "react-redux";
import { addMotivationalQuote } from "../../lib/apiMotivational";
import useInput from "../../hooks/use-input";
import { TextField, Button, Paper } from "@mui/material";
import classes from "./UserForm.module.css";
import { RootState } from "../../store";
import MotivationalQuote from "../models/motivationalQuote";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  
  const {
    value: enteredMotivationalQuote,
    isValid: enteredMotivationalQuoteIsValid,
    hasError: motivationalQuoteInputHasError,
    valueChangeHandler: motivationalQuoteChangeHandler,
    inputBlurHandler: motivationalQuoteBlurHandler,
    reset: resetMotivational,
  } = useInput((value) => value.trim() !== "");

  const dispatch = useDispatch();

  const navigateToMotivationalPage = () => {
    navigate(`${process.env.PUBLIC_URL}/motivational-quotes`)
  }

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      !enteredMotivationalQuoteIsValid) {
      return;
    }
    const dataToSave = new MotivationalQuote(enteredMotivationalQuote, new Date(), userData.uid);
    resetMotivational();
    dispatch(addMotivationalQuote(dataToSave, navigateToMotivationalPage));
  };

  let formIsValid = false;

  if (enteredMotivationalQuoteIsValid) {
    formIsValid = true;
  }

  return (
    <Paper className={classes.user}>
      <h3>Add a motivational quote</h3>
      <form onSubmit={submitHandler}>
        <TextField
          id="motivational"
          label="Motivational Quote"
          variant="outlined"
          className={classes.userEditControl}
          value={enteredMotivationalQuote}
          onChange={motivationalQuoteChangeHandler}
          onBlur={motivationalQuoteBlurHandler}
          error={motivationalQuoteInputHasError}
          helperText={motivationalQuoteInputHasError && "Please insert a valid motivational quote"}
          required
        />
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
    </Paper>
  );
};

export default UserForm;
