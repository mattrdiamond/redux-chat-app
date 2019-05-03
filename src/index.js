import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import "./index.css";
import "./fonts/fonts.css";
import { Provider } from "react-redux";
import App from "./containers/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
