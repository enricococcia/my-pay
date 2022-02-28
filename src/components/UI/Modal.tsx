import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const portalElement = document.getElementById("overlay-root") as HTMLElement;

const Modal: React.FC<{ onClose: () => void; className?: string }> = (
	props
) => {
	return (
		<>
			{ReactDOM.createPortal(
				<div>
					<Backdrop onClose={props.onClose} />
					<div>
						<div className={classes.modal}>
							<div className={classes.content}>
								<div
									className={classes.closeButton}
									onClick={props.onClose}
									role="button"
									tabIndex={0}
								>
									X
								</div>
								{props.children}
							</div>
						</div>
					</div>
				</div>,
				portalElement
			)}
		</>
	);
};

export default Modal;
