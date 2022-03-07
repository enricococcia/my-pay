import UserWidget from "../../components/User/UserWidget";
import UserForm from "../../components/User/UserForm";
import classes from "./Profile.module.css";
const Profile = () => {
  return (
    <div className="container">
      <UserWidget />
      <div className={classes.profileContainer}>
        <UserForm />
      </div>
    </div>
  );
};

export default Profile;
