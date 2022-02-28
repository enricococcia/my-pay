import { Link } from "react-router-dom";
import classes from "./Pagination.module.css";

const Pagination: React.FC<{
	info: { count: number; prev: number; next: number };
	page: number;
	url: string;
	type: string;
}> = (props) => {
	const { info, page, url, type } = props;
	const groupPageLimit = 6;
	const getPaginationGroup = () => {
		let start = Math.floor((page - 1) / groupPageLimit) * groupPageLimit;
		return new Array(Math.ceil(info.count / groupPageLimit))
			.fill(undefined)
			.map((_, idx) => start + idx + 1);
	};

	let paginationContent = null;
	if (info) {
		paginationContent = (
			<div
				className={`${classes.pagination} ${
					type ? classes[type] : null
				}`}
			>
				<Link
					to={`${url}${+page - 1}`}
					className={`${classes.prev} ${
						info.prev === null ? classes.disabled : ""
					}`}
				>
					&lt;
				</Link>
				{getPaginationGroup().map((item, index) => (
					<Link
						key={index}
						to={`${url}${+item}`}
						className={`${classes.paginationItem} ${
							+page === item ? classes.active : ""
						}`}
					>
						{item}
					</Link>
				))}
				<Link
					to={`${url}${+page + 1}`}
					className={`${classes.next} ${
						info.next === null ? classes.disabled : ""
					}`}
				>
					&gt;
				</Link>
			</div>
		);
	}
	return paginationContent;
};

export default Pagination;
