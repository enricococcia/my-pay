import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TableCell, TableRow } from "@mui/material";

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
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {new Date(props.date).getDate()}/{new Date(props.date).getMonth()}/
        {new Date(props.date).getFullYear()}
      </TableCell>
      <TableCell align="right">{props.title}</TableCell>
      <TableCell align="right">{props.type}</TableCell>
      <TableCell align="right">{props.cost}€</TableCell>
      <TableCell align="right">
        <Button onClick={() => props.deleteExpense(props.eid)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserStatsExpenseItem;
