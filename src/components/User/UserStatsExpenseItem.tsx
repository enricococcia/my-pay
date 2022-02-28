import Button from "../UI/Button";
import { AiFillDelete } from "react-icons/ai";
import classes from "./UserStats.module.css";

const UserStatsExpenseItem: React.FC<{
	id: string;
    eid: string;
	date: Date;
	title: string;
	cost: string;
	type: string;
	deleteExpense: (id: string) => void;
}> = (props) => {
	return (
		<div className={classes.itemExpense}>
			<div>
				<strong>
					{new Date(props.date).getDate()}/
					{new Date(props.date).getMonth()}/
					{new Date(props.date).getFullYear()}
				</strong>
				: {props.title} - {props.type} - {props.cost}€
			</div>
			<Button
				size="small"
				shape="circle"
				version="delete"
				onClick={() => props.deleteExpense(props.eid)}
			>
				<AiFillDelete />
			</Button>
		</div>
	);
};

export default UserStatsExpenseItem;
