import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewExpenseForm from "../../components/Expenses/NewExpenseForm";
import { addExpense } from "../../lib/apiExpense";

const NewExpense = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//const [expenses, setExpenses] = useState<Expense[]>([]);
	//const expenses = [new Expense("A"), new Expense("B")];

	const navigateToHomePage = useCallback(() => {
		navigate(`${process.env.PUBLIC_URL}`);
	}, [navigate]);

	const onSubmitHandler = (data: {}) => {
		dispatch(addExpense(data, navigateToHomePage));
	};

	return (
		<div className="container">
			<NewExpenseForm onSubmit={onSubmitHandler} />
		</div>
	);
};

export default NewExpense;
