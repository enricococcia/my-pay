import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { retrieveStoredToken } from "./helper/authHelper";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import NewExpense from "./pages/NewExpense/NewExpense";
import { RootState } from "./store";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Stats from "./pages/Stats/Stats";
const App = () => {

	const tokenData = retrieveStoredToken();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);
	const userData = useSelector((state:RootState) => state.auth.user);

	useEffect(() => {
		if (tokenData) {
			setTimeout(dispatch(authActions.logout), tokenData.duration);
		}
	}, [tokenData, userData, dispatch]);

    
    const navigateToHome =  <Navigate to={`${process.env.PUBLIC_URL}/`} />;
    const navigateToLogin =  <Navigate to={`${process.env.PUBLIC_URL}/login`} />;
    
	return (
		<Layout>
			<Routes>
				<Route
					path={`${process.env.PUBLIC_URL}/`}
					element={!isLoggedIn ? navigateToLogin : <Home />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/create`}
					element={!isLoggedIn ? navigateToLogin : <NewExpense />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/stats`}
					element={!isLoggedIn ? navigateToLogin : <Stats />}
				/>
                <Route
					path={`${process.env.PUBLIC_URL}/profile`}
					element={!isLoggedIn ? navigateToLogin : <Profile />}
				/>
                <Route
					path={`${process.env.PUBLIC_URL}/login`}
					element={isLoggedIn ? navigateToHome : <Login />}
				/>
				<Route
					path={`${process.env.PUBLIC_URL}/*`}
					element={isLoggedIn ? navigateToHome : <Home /> }
				/>
			</Routes>
		</Layout>
	);
};

export default App;
