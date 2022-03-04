import Modal from "../UI/Modal";
import classes from "./UserStats.module.css";
import InfoIcon from "@mui/icons-material/Info";
import Expense from "../models/expense";
import UserStatsExpenseItem from "./UserStatsExpenseItem";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
  } from "@mui/material";

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
           </TableBody>
          </Table>
        </TableContainer>
          )}

          <span className={classes.modalActions}>
            <Button onClick={() => props.toggleModal("")}>Back</Button>
          </span>
        </Modal>
      )}
    </>
  );
};

export default UserForm;
