import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getUserStats } from "../../lib/apiExpense";
import { RootState } from "../../store";
import UserStats from "../../components/models/userStats";
import classes from "./Home.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
	const userData = useSelector((state: RootState) => state.auth.user);

	const [expensesData, setExpensesData] = useState<UserStats>();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserStats(userData.uid, setExpensesData));
		return () => {};
	}, [userData.uid, dispatch]);

	const data = {
		labels: [
			"Food and drink",
			"Hobbies",
			"Clothes",
			"Market",
			"Shopping Online",
			"Other",
		],
		datasets: [
			{
				label: "# of Expenses",
				data: [
					expensesData?.info?.foodDrink.value,
					expensesData?.info?.hobbies.value,
					expensesData?.info?.clothes.value,
					expensesData?.info?.market.value,
					expensesData?.info?.online.value,
					expensesData?.info?.other.value,
				],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};
    let monthExpenses = 0;
	
    if(expensesData?.month.value) {
        monthExpenses = expensesData?.month.value;
    }

	return (
		<div className="container">
			<div className={classes.home}>
                <div className={classes.chartContainer}>
                    <h3>Types Chart</h3>
                    <Pie data={data} />
                </div>
				<div className={classes.costContainer}>
					<h3>Today you spent:</h3>
					<p>{expensesData?.today.value}€</p>
				</div>
				<div className={classes.costContainer}>
					<h3>Budget remaining:</h3>
					<p className={classes.budget}>
						{+userData.budget - +monthExpenses}
						€
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
