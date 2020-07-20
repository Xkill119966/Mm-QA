import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { setupAxios } from "./utils/setupAxios";
import store from "./store/store";
import App from "./App";

import "./styles/index.css";
import "./styles/fontStyles.css";

setupAxios(axios, store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
