import nextId from "react-id-generator";
import Home from "./pages/Home/Home";
import NewExpense from "./pages/NewExpense/NewExpense";
import Stats from "./pages/Stats/Stats";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";

export const appRouter = [
  {
    id: nextId(),
    isVisible: true,
    type: "standard",
    path: `${process.env.PUBLIC_URL}/`,
    name: "Home",
    element: <Home />,
  },
  {
    id: nextId(),
    isVisible: true,
    type: "standard",
    path: `${process.env.PUBLIC_URL}/create`,
    name: "New",
    element: <NewExpense />,
  },
  {
    id: nextId(),
    isVisible: true,
    type: "standard",
    path: `${process.env.PUBLIC_URL}/stats`,
    name: "Stats",
    element: <Stats />,
  },
  {
    id: nextId(),
    isVisible: true,
    type: "profile",
    path: `${process.env.PUBLIC_URL}/profile`,
    name: "Profile",
    element: <Profile />,
  },
  {
    id: nextId(),
    isVisible: false,
    type: "profile",
    path: `${process.env.PUBLIC_URL}/login`,
    name: "Login",
    element: <Login />,
  },
  {
    id: nextId(),
    isVisible: false,
    type: "standard",
    path: `${process.env.PUBLIC_URL}/*`,
    name: "Not Found",
    element: <Home />,
  }
];