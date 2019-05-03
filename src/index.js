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

// fancyLog();

// const render = () => {
//   fancyLog();
//   return ReactDOM.render(<App />, document.getElementById("root"));
// };

// render();
// store.subscribe(render);

// function fancyLog() {
//   console.log("%c Rendered with 👉 👉👇", "background: purple; color: #FFF");
//   console.log(store.getState());
// }
