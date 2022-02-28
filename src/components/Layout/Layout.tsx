import { useSelector } from "react-redux";
import MainNavigation from "./MainNavigation";
import Notification from "../UI/Notification";
import LoadingSpinner from "../UI/LoadingSpinner";
import { RootState } from "../../store";

const Layout : React.FC<{}> = (props) => {
	const isNotificationBarVisible = useSelector(
		(state: RootState) => state.ui.barIsVisible
	);
	const notificationData = useSelector((state: RootState) => state.ui.notification);
    
    const isLoaderVisible = useSelector((state: RootState) => state.ui.loaderIsVisible);
	
    return (
		<>
    
            {isLoaderVisible && (
				<LoadingSpinner />
			)}
			{isNotificationBarVisible && (
				<Notification notification={notificationData} />
			)}
        
			<MainNavigation />
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
