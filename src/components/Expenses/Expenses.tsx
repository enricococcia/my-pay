import Expense from "..//../components/models/expense";
import ExpenseItem from "./ExpenseItem";
import classes from "./Expenses.module.css";

const Expenses: React.FC<{
  items: Expense[];
  onRemoveExpense: (id: string) => void;
}> = (props) => {
  return (
    <>
      <ul className={classes.expenses}>
        {props.items.map((item) => {
          return (
            <ExpenseItem
              key={item.id}
              title={item.title}
              onRemoveExpense={props.onRemoveExpense.bind(null, item.id)}
            />
          );
        })}
      </ul>
      {props.children && <div>{props.children}</div>}
    </>
  );
};

export default Expenses;
