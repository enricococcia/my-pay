import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./UserStats.module.css";
import { FaThList } from "react-icons/fa";
import Expense from "../models/expense";
import UserStatsExpenseItem from "./UserStatsExpenseItem";

const UserForm: React.FC<{
	id: string;
	title: string;
	cost?: number;
	result?: Expense[];
	toggleModal: (id: string) => void;
	deleteExpense: (id: string) => void;
	idModalOpened: string;
}> = (props) => {
	return (
		<>
			<tr>
				<td>{props.title}</td>
				<td>{props.cost}€</td>
				<td>{props.result?.length}</td>
				<td>
					{props.result && props.result?.length > 0 && (
						<Button
							shape="circle"
							size="small"
							onClick={() => props.toggleModal(props.id)}
						>
							<FaThList />
						</Button>
					)}
				</td>
			</tr>
			{props.idModalOpened === props.id && (
				<Modal onClose={() => props.toggleModal("")}>
					<h3>{props.title} Expenses</h3>
					{!props.result?.length ||
						(props.result?.length === 0 && <p>No result</p>)}

					{props.result && props.result?.length > 0 && (
						<div className={classes.containerAllViews}>
							{props?.result.map((item) => {
								return (
									<UserStatsExpenseItem
										key={item.id}
										id={item.id}
                                        eid={item.eid}
										date={item.date}
										title={item.title}
										type={item.type}
										cost={item.cost}
										deleteExpense={props.deleteExpense}
									/>
								);
							})}
						</div>
					)}

					<span className={classes.modalActions}>
						<Button
							version="secondary"
							onClick={() => props.toggleModal("")}
						>
							Back
						</Button>
					</span>
				</Modal>
			)}
		</>
	);
};

export default UserForm;
