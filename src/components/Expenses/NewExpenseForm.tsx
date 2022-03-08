import { useSelector } from "react-redux";
import useInput from "../../hooks/use-input";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import Expense from "../models/expense";
import { RootState } from "../../store";
import { categories } from "../../const/categories";
import classes from "./NewExpenseForm.module.css";

const NewExpenseForm: React.FC<{ onSubmit: (data: {}) => void }> = (props) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((value) => value.trim().length < 40);

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredType,
    isValid: enteredTypeIsValid,
    hasError: typeInputHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetType,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCost,
    isValid: enteredCostIsValid,
    hasError: costInputHasError,
    valueChangeHandler: costChangeHandler,
    inputBlurHandler: costBlurHandler,
    reset: resetCost,
  } = useInput((value) => +value > 0);

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
    const dataToSave = new Expense(
      enteredTitle,
      new Date(enteredDate),
      enteredType,
      enteredCost,
      userData.uid
    );

    props.onSubmit(dataToSave);
    resetTitle();
    resetDate();
    resetType();
    resetCost();
  };

  let formIsValid = false;

  if (
    enteredTitleIsValid &&
    enteredDateIsValid &&
    enteredTypeIsValid &&
    enteredCostIsValid
  ) {
    formIsValid = true;
  }

  return (
    <Paper className={classes.newExpense}>
      <h3>Add a new expense</h3>
      <form onSubmit={submitHandler}>
        <div className={classes.newExpenseControl}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            error={titleInputHasError}
            helperText={titleInputHasError && "Please insert a valid title."}
            fullWidth
            required
          />
        </div>
        <div className={classes.newExpenseControl}>
          <TextField
            id="date"
            type="date"
            label=""
            variant="outlined"
            value={enteredDate}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
            error={dateInputHasError}
            helperText={dateInputHasError && "Please insert a valid date."}
            fullWidth
            required
          />
        </div>
        <div className={classes.newExpenseControl}>
          <FormControl 
              fullWidth>
            <InputLabel id="type">Type *</InputLabel>
            <Select
              labelId="type"
              id="type-select"
              value={enteredType}
              label="Type"
              onChange={typeChangeHandler}
              onBlur={typeBlurHandler}
              error={typeInputHasError}
              required
            >
              <MenuItem value=""></MenuItem>
              {categories.map((item) => {
                return <MenuItem key={item.id} value={item.id}>{item.icon} {item.label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <div className={classes.newExpenseControl}>
          <TextField
            id="cost"
            type="number"
            label="Cost"
            variant="outlined"
            value={enteredCost}
            onChange={costChangeHandler}
            onBlur={costBlurHandler}
            error={costInputHasError}
            fullWidth
            helperText={costInputHasError && "Please insert a valid cost."}
            required
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
    </Paper>
  );
};

export default NewExpenseForm;
