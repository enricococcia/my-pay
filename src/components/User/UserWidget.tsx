import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import useScroll from "../../hooks/use-scroll";
import { deleteUser } from "../../lib/apiUser";
import { Button, FormGroup, FormControlLabel, Switch, Paper } from "@mui/material";
import Modal from "../UI/Modal";
import classes from "./UserWidget.module.css";
import ChangePasswordForm from "./ChangePasswordForm";
import { RootState } from "../../store";
import { ThemeContext } from "../../store/theme-context";
import { uiActions } from "../../store/ui-slice";

const UserWidget = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [widgetClass, setWidgetClass] = useState(classes.widget);
  const isScrolledObj = useScroll();

  const themeCtx = useContext(ThemeContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    themeCtx.toggleDark(event.target.checked);
    let switchMessage = "Dark mode activated!"
    if(!event.target.checked) {
      switchMessage = "Dark mode deactivated!"
    }
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success",
        message: switchMessage,
      })
    );
  };

  useEffect(() => {
    if (isScrolledObj.scroll) {
      setWidgetClass(`${classes.widget} ${classes.sticky}`);
    } else {
      setWidgetClass(classes.widget);
    }
    return () => {
      setWidgetClass("");
    };
  }, [isScrolledObj.scroll]);

  const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);
  const [isEditModalOpened, setEditModalOpened] = useState(false);

  return (
    <>
      <div className={classes.widgetContainer}>
        <Paper className={widgetClass}>
          <div className={classes.widgetInfoSwitch}>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={themeCtx.dark}
                onChange={handleChange}/>}
                label="Dark mode"
              />
            </FormGroup>
          </div>
          
          <div className={classes.widgetInfo}>
            <h1 className={classes.name}>{userData.name}</h1>
            <h2 className={classes.userName}>{userData.userName}</h2>
          </div>
          <div className={classes.widgetActions}>
            <Button
              variant="contained"
              onClick={() => setEditModalOpened(true)}
            >
              Settings
            </Button>
            <Button
              variant="contained"
              onClick={() => setDeleteModalOpened(true)}
              color="error"
            >
              Delete
            </Button>
          </div>
        </Paper>
      </div>
      {isEditModalOpened && (
        <Modal onClose={() => setEditModalOpened(false)}>
          <h3>Edit</h3>
          <p>
            Hello <strong>{userData.name}</strong>, write here your new
            password.
          </p>
          <ChangePasswordForm toggleModalEditHandler={setEditModalOpened} />
        </Modal>
      )}
      {isDeleteModalOpened && (
        <Modal onClose={() => setDeleteModalOpened(false)}>
          <h3>Delete</h3>
          <p>
            Hello <strong>{userData.name}</strong>, are you sure to delete your
            account?
          </p>
          <div className={classes.modalActions}>
            <Button onClick={() => setDeleteModalOpened(false)}>Back</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(deleteUser(userData.uid, userData.id))}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserWidget;
