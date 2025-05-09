import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.min.css";
import { Provider } from "react-redux";
import store from "../src/util/redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
