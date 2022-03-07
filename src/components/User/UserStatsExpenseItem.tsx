import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TableCell, TableRow } from "@mui/material";
import { categories } from "../../const/categories";

const UserStatsExpenseItem: React.FC<{
  id: string;
  eid: string;
  date: Date;
  title: string;
  cost: string;
  type: string;
  deleteExpense: (id: string) => void;
}> = (props) => {

  const iconArray = categories.filter((item) => item.id === props.type);
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {new Date(props.date).getDate()}/{new Date(props.date).getMonth()}/
        {new Date(props.date).getFullYear()}
      </TableCell>
      <TableCell align="right">{props.title}</TableCell>
      <TableCell align="right">{iconArray[0].icon}</TableCell>
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
