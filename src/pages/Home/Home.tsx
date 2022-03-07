import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getUserStats } from "../../lib/apiExpense";
import { RootState } from "../../store";
import UserStats from "../../components/models/userStats";
import classes from "./Home.module.css";
import { Paper, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.user);

  const [expensesData, setExpensesData] = useState<UserStats>();

  useEffect(() => {
    dispatch(getUserStats(userData.uid, setExpensesData));
    return () => {
      setExpensesData((prevState) => prevState);
    };
  }, [userData.uid, dispatch]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

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

  if (expensesData?.month.value) {
    monthExpenses = expensesData?.month.value;
  }

  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <Button
          size="large"
          onClick={() => navigate(`${process.env.PUBLIC_URL}/create`)}
          endIcon={<AddIcon />}
        >
          Add New Expense
        </Button>
      </div>
      <div className="container">
        <Paper>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "stretch", sm: "space-between" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            className={classes.stack}
          >
            <Item>
              {" "}
              <h3>Types Chart</h3>
              <Pie data={data} />
            </Item>
            <Item>
              {" "}
              <h3>Today's expenses:</h3>
              <p className={classes.budgetToday}>
                {expensesData?.today.value}€
              </p>
            </Item>
            <Item>
              <h3>Budget remaining:</h3>
              <p className={classes.budgetRemaining}>
                {+userData.budget - +monthExpenses}€
              </p>
            </Item>
          </Stack>
        </Paper>
      </div>{" "}
    </>
  );
};

export default Home;
