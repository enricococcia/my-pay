import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { retrieveStoredToken } from "./helper/authHelper";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import Layout from "./components/Layout/Layout";
import { RootState } from "./store";
import { appRouter } from "./router";
import { ThemeContext } from "./store/theme-context";

const App = () => {
  const tokenData = retrieveStoredToken();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userData = useSelector((state: RootState) => state.auth.user);
  const themeCtx = useContext(ThemeContext);


  useEffect(() => {
		if (themeCtx.dark) {
      document.body.classList.add("dark");
		} else {
      document.body.classList.remove("dark");
    }
	}, [themeCtx]);

  useEffect(() => {
    if (tokenData) {
      setTimeout(dispatch(authActions.logout), tokenData.duration);
    }
  }, [tokenData, userData, dispatch]);

  const navigateToHome = <Navigate to={`${process.env.PUBLIC_URL}/`} />;
  const navigateToLogin = <Navigate to={`${process.env.PUBLIC_URL}/login`} />;

  const navigateTo = (item: string, el: React.ReactNode) => {
    if (item === "Login") {
      return isLoggedIn ? navigateToHome : el;
    }
    return !isLoggedIn ? navigateToLogin : el;
  };

  return (
    <Layout>
      <Routes>
        {appRouter.map((item) => {
          return (
            <Route
              key={item.id}
              path={item.path}
              element={navigateTo(item.name, item.element)}
            />
          );
        })}
      </Routes>
    </Layout>
  );
};

export default App;
