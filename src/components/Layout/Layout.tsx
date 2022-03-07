import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "./MainNavigation";
import { Snackbar, Alert } from "@mui/material";
import { uiActions } from "../../store/ui-slice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LoadingSpinner from "../UI/LoadingSpinner";
import { RootState } from "../../store";

const Layout: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const isNotificationBarVisible = useSelector(
    (state: RootState) => state.ui.barIsVisible
  );
  const notificationData = useSelector(
    (state: RootState) => state.ui.notification
  );

  const isLoaderVisible = useSelector(
    (state: RootState) => state.ui.loaderIsVisible
  );

  const handleClose = () => {
    dispatch(uiActions.clearNotification());
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {isLoaderVisible && <LoadingSpinner />}
      {isNotificationBarVisible && (
        <Snackbar
          open={isNotificationBarVisible}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={handleClose}
            severity={
              notificationData?.status === "error" ? "error" : "success"
            }
            sx={{ width: "100%" }}
          >
            <strong>{notificationData?.title}</strong>:{" "}
            {notificationData?.message}
          </Alert>
        </Snackbar>
      )}
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
