import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import store from "./store/index";
import "./index.css";
import App from "./App";

import ThemeContextProvider from "./store/theme-context";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
