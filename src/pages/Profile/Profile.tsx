import UserWidget from "../../components/User/UserWidget";
import UserForm from "../../components/User/UserForm";
import UserMotivationalQuoteForm from "../../components/User/UserMotivationalQuoteForm";
import UserMotivationalQuotes from "../../components/User/UserMotivationalQuotes";
import classes from "./Profile.module.css";

const Profile = () => {
  return (
    <div className="container">
      <UserWidget />
      <div className={classes.profileContainer}>
        <UserForm />
        <UserMotivationalQuoteForm />
        <UserMotivationalQuotes />
      </div>
    </div>
  );
};

export default Profile;
