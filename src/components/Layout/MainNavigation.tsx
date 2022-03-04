import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/svg";
import classes from "./MainNavigation.module.css";
import { authActions } from "../../store/auth-slice";
import LogoutIcon from '@mui/icons-material/Logout';
import { RootState } from "../../store";
import { Button } from "@mui/material";

const MainNavigation = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	let contentNav;
	if (isLoggedIn) {
		contentNav = (
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink to={`${process.env.PUBLIC_URL}/`}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to={`${process.env.PUBLIC_URL}/create`}>
							New
						</NavLink>
					</li>
					<li>
						<NavLink to={`${process.env.PUBLIC_URL}/profile`}>
							Profile
						</NavLink>
					</li>
					<li>
						<Button
							className={classes.logout}
							onClick={() => dispatch(authActions.logout())}
						>
							<LogoutIcon />
						</Button>
					</li>
				</ul>
			</nav>
		);
	}

	return (
		<div className={classes.headerWrapper}>
			<div className="container-fluid">
				<header className={classes.header}>
					<Link
						to={`${process.env.PUBLIC_URL}/`}
						className={classes.logoLink}
					>
						<Logo />
					</Link>
					{contentNav}
				</header>
			</div>
		</div>
	);
};

export default MainNavigation;
