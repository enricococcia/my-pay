import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./UserStats.module.css";
import { getUserStats, deleteExpense } from "../../lib/apiExpense";
import Button from "../UI/Button";
import { RootState } from "../../store";
import UserStats from "../models/userStats";
import UserStatsTableItem from "./UserStatsTableItem";
import UserStatsExpenseItem from "./UserStatsExpenseItem";

const UserStatsPage = () => {
	const userData = useSelector((state: RootState) => state.auth.user);

	const [expensesData, setExpensesData] = useState<UserStats>();
	const [idModalOpened, setIdModalOpened] = useState("");
	const [isAllExpensesVisible, setIsAllExpensesVisible] = useState(false);
	const dispatch = useDispatch();

	const getUserStatFn = () => {
		dispatch(getUserStats(userData.uid, setExpensesData));
	};

	useEffect(() => {
		getUserStatFn();
		return () => {};
	}, [getUserStats, userData.uid, dispatch]);

	const deleteExpenseHandler = (id: string) => {
		dispatch(deleteExpense(id, getUserStatFn));
	};

	return (
		<div className={classes.userStats}>
			<h3>User Stats</h3>

			<label className={classes.labelProgress} htmlFor="budgetprogress">
				Budget progress({expensesData?.month.value}€ / {userData.budget}
				€):
			</label>
			<br />
			<progress
				id="budgetprogress"
				value={expensesData?.month.value}
				max={userData.budget}
			>
				{" "}
				32%{" "}
			</progress>
			<br />
			<br />

			<table>
				<thead>
					<tr>
						<th>Period</th>
						<th>Total Cost</th>
						<th>N° Expenses</th>
						<th>View entries</th>
					</tr>
				</thead>
				<tbody>
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
				</tbody>
			</table>
			<div className={classes.buttonViewExpensesContainer}>
				<Button
					onClick={() =>
						setIsAllExpensesVisible(!isAllExpensesVisible)
					}
				>
					View all expenses
				</Button>
			</div>

			{isAllExpensesVisible && (
				<div className={classes.containerAllViews}>
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
				</div>
			)}
		</div>
	);
};

export default UserStatsPage;
