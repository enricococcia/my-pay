import Modal from "../UI/Modal";
import classes from "./UserStats.module.css";
import InfoIcon from "@mui/icons-material/Info";
import Expense from "../models/expense";
import ExpensesTable from "../Expenses/ExpensesTable";
import {
	Button,
	TableCell,
	TableRow,
  } from "@mui/material";

const UserStatsTableItem: React.FC<{
  id: string;
  title: string;
  cost?: number;
  result?: Expense[];
  toggleModal: (id: string) => void;
  deleteExpense: (id: string[]) => void;
  idModalOpened: string;
}> = (props) => {
  return (
    <>

      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          {props.title}
        </TableCell>
        <TableCell align="right">{props.cost}€</TableCell>
        <TableCell align="right">{props.result?.length}</TableCell>
        <TableCell align="right">
          {props.result && props.result?.length > 0 && (
            <Button onClick={() => props.toggleModal(props.id)}>
              <InfoIcon />
            </Button>
          )}
        </TableCell>
      </TableRow>
      {props.idModalOpened === props.id && (
        <Modal onClose={() => props.toggleModal("")}>
          <h3>{props.title} Expenses</h3>
          {!props.result?.length ||
            (props.result?.length === 0 && <p>No result</p>)}

          {props.result && props.result?.length > 0 && (
            <ExpensesTable title="All Expenses" result={props!.result} deleteExpense={props.deleteExpense} />
          )}

          <span className={classes.modalActions}>
            <Button onClick={() => props.toggleModal("")}>Back</Button>
          </span>
        </Modal>
      )}
    </>
  );
};

export default UserStatsTableItem;
