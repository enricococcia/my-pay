import React, { useState } from "react";

type ThemeContextObj = {
  dark: boolean;
  toggleDark: (dark: boolean) => void;
};

const localStorageTheme: any = localStorage.getItem("dark");
const jsonLocalStorageTheme: boolean = JSON.parse(localStorageTheme);

export const ThemeContext = React.createContext<ThemeContextObj>({
  dark: jsonLocalStorageTheme || false,
  toggleDark: () => {},
});

const ThemeContextProvider: React.FC = (props) => {
  const [dark, setDark] = useState(jsonLocalStorageTheme);

  const toggleDarkHandler = (dark: boolean) => {
    localStorage.setItem("dark", dark.toString());
    setDark(dark);
  };

  const contextValue: ThemeContextObj = {
    dark: dark,
    toggleDark: toggleDarkHandler,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
