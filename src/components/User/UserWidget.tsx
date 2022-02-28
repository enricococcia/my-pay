import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useScroll from "../../hooks/use-scroll";
import { deleteUser } from "../../lib/apiUser";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./UserWidget.module.css";
import ChangePasswordForm from "./ChangePasswordForm";
import { RootState } from "../../store";

const UserWidget = () => {
	const userData = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();

	const isScrolledObg = useScroll();
	const isScrolled = isScrolledObg.scroll;
	let widgetClass = classes.widget;
	if (isScrolled) {
		widgetClass = `${classes.widget} ${classes.sticky}`;
	}

    useEffect(() => {
        return () => {

        }
    },[userData])

	const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);
	const [isEditModalOpened, setEditModalOpened] = useState(false);

	return (
		<>
			<div className={classes.widgetContainer}>
				<div className={widgetClass}>
					<div className={classes.widgetInfo}>
						<h1 className={classes.name}>{userData.name}</h1>
						<h2 className={classes.userName}>
							{userData.userName}
						</h2>
					</div>
					<div className={classes.widgetActions}>
						<Button
							version="secondary"
							onClick={() => setEditModalOpened(true)}
						>
							Settings
						</Button>
						<Button
							version="delete"
							onClick={() => setDeleteModalOpened(true)}
						>
							Delete
						</Button>
					</div>
				</div>
			</div>
			{isEditModalOpened && (
				<Modal onClose={() => setEditModalOpened(false)}>
					<h3>Edit</h3>
					<p>
						Ciao <strong>{userData.name}</strong>, compila il form
						per modificare la tua password.
					</p>
					<ChangePasswordForm
						toggleModalEditHandler={setEditModalOpened}
					/>
				</Modal>
			)}
			{isDeleteModalOpened && (
				<Modal onClose={() => setDeleteModalOpened(false)}>
					<h3>Delete</h3>
					<p>
						Ciao <strong>{userData.name}</strong>, sei sicuro di
						voler cancellare il tuo profilo?
					</p>
					<div className={classes.modalActions}>
						<Button
							version="secondary"
							onClick={() => setDeleteModalOpened(false)}
						>
							Back
						</Button>
						<Button
							version="delete"
							onClick={() =>
								dispatch(deleteUser(userData.uid, userData.id))
							}
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
