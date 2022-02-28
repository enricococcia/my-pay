import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserWidget from "../../components/User/UserWidget";
import UserForm from "../../components/User/UserForm";
import UserStats from "../../components/User/UserStats";
import classes from "./Profile.module.css";
import { RootState } from "../../store";
const Profile = () => {
    const userData = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        return () => {

        }
    },[userData])

	return (
		<div className="container">
			<UserWidget />
			<div className={classes.profileContainer}>
				<UserForm />
				<UserStats />
			</div>
		</div>
	);
};

export default Profile;
