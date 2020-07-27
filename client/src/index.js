import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { setupAxios } from "./utils/setupAxios";
import registerIcons from "./fontLib";
import { actions } from "./store/ducks/auth.duck";
import "./styles/fontStyles.css";
import "./styles/index.css";

import store, { persistor } from "./store/store";
import App from "./App";

registerIcons();

setupAxios(axios, store);
store.dispatch(actions.checkAuth())
ReactDOM.render(
  <App store={store} persistor={persistor} />,
  document.getElementById("root")
);
