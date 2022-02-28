import React from "react";
import classes from "./Card.module.css";

const Card: React.FC<{ className: string, onClick?: () => void }> = (props) => {
	return (
		<div
			className={`${classes.card} ${
				props.className ? props.className : ""
			}`}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};

export default Card;
