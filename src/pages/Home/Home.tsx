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
import { categories } from "../../const/categories";

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

  const arrayLabel:string[] = [];
  const arrayBackgroundColor = [];
  const arrayBorderColor = [];
  for (const element of categories) {
    arrayLabel.push(element.label);
    arrayBackgroundColor.push(element.backgroundColor);
    arrayBorderColor.push(element.borderColor);
  }
  const data = {
    labels: arrayLabel,
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
        backgroundColor: arrayBackgroundColor,
        borderColor: arrayBorderColor,
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
          New Expense
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
