import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { setupAxios } from "./utils/setupAxios";
import registerIcons from "./fontLib";
import { actions } from "./store/ducks/auth.duck";
import "./styles/fontStyles.css";
import "./styles/index.css";

import store from "./store/store";
import App from "./App";

registerIcons();

store.dispatch(actions.checkAuth());

setupAxios(axios, store);

ReactDOM.render(<App store={store} />, document.getElementById("root"));
