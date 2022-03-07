import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./UserStats.module.css";
import { getUserStats, deleteExpense } from "../../lib/apiExpense";
import { RootState } from "../../store";
import UserStats from "../models/userStats";
import UserStatsTableItem from "./UserStatsTableItem";
import {
  LinearProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import UserStatsExpenseItem from "./UserStatsExpenseItem";

const UserStatsPage = () => {
  const userData = useSelector((state: RootState) => state.auth.user);

  const [expensesData, setExpensesData] = useState<UserStats>();
  const [idModalOpened, setIdModalOpened] = useState("");
  const [isAllExpensesVisible, setIsAllExpensesVisible] = useState(false);
  const dispatch = useDispatch();

  const getUserStatFn = useCallback(() => {
    dispatch(getUserStats(userData.uid, setExpensesData));
  }, [dispatch, userData.uid]);

  const deleteExpenseHandler = (id: string) => {
    dispatch(deleteExpense(id, getUserStatFn));
  };

  useEffect(() => {
    getUserStatFn();
    return () => {};
  }, [getUserStatFn]);



  return (
    <Paper className={classes.userStats}>
      <h3>Hi {userData.name}, here your expenses</h3>

      {expensesData?.month.value && (
        <>
          <label className={classes.labelProgress} htmlFor="budgetprogress">
            Budget progress{" "}
            <strong>
              {((+expensesData.month.value * 100) / +userData.budget).toFixed(2)}%
            </strong>{" "}
            ({expensesData.month.value}€ / {userData.budget}
            €):
          </label>
          <br />
          <LinearProgress
            variant="determinate"
            color="warning"
            value={(+expensesData.month.value * 100) / +userData.budget}
          />
        </>
      )}

      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell align="right">Total Cost</TableCell>
              <TableCell align="right">N° Expenses</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <UserStatsTableItem
              id="today"
              title="Today"
              cost={expensesData?.today.value}
              result={expensesData?.today.result}
              toggleModal={setIdModalOpened}
              idModalOpened={idModalOpened}
              deleteExpense={deleteExpenseHandler}
            />
            <UserStatsTableItem
              id="week"
              title="Last week"
              cost={expensesData?.week.value}
              result={expensesData?.week.result}
              toggleModal={setIdModalOpened}
              idModalOpened={idModalOpened}
              deleteExpense={deleteExpenseHandler}
            />
            <UserStatsTableItem
              id="month"
              title="Last month"
              cost={expensesData?.month.value}
              result={expensesData?.month.result}
              toggleModal={setIdModalOpened}
              idModalOpened={idModalOpened}
              deleteExpense={deleteExpenseHandler}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classes.buttonViewExpensesContainer}>
        <Button onClick={() => setIsAllExpensesVisible(!isAllExpensesVisible)}>
          View all expenses
        </Button>
      </div>

      {isAllExpensesVisible && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expensesData?.result.map((item) => {
                return (
                  <UserStatsExpenseItem
                    key={item.eid}
                    id={item.id}
                    eid={item.eid}
                    date={item.date}
                    title={item.title}
                    type={item.type}
                    cost={item.cost}
                    deleteExpense={deleteExpenseHandler}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default UserStatsPage;
