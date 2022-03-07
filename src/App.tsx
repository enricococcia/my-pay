import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { retrieveStoredToken } from "./helper/authHelper";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import Layout from "./components/Layout/Layout";
import { RootState } from "./store";
import { appRouter } from "./router";

const App = () => {
  const tokenData = retrieveStoredToken();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userData = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (tokenData) {
      setTimeout(dispatch(authActions.logout), tokenData.duration);
    }
  }, [tokenData, userData, dispatch]);

  const navigateToHome = <Navigate to={`${process.env.PUBLIC_URL}/`} />;
  const navigateToLogin = <Navigate to={`${process.env.PUBLIC_URL}/login`} />;

  const navigateTo = (item: string, el: React.ReactNode) => {
    if (item === "Login" || item === "Not Found") {
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
