import React from "react";
import classes from "./ExpenseItem.module.css";

const ExpenseItem: React.FC<{
  title: string;
  onRemoveExpense: () => void;
}> = (props) => {
  return (
    <li className={classes.item} onClick={props.onRemoveExpense}>
      {props.title}
    </li>
  );
};

export default ExpenseItem;
