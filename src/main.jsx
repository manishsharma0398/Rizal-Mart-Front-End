import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import App from "./App";
import store from "./app/store";
import { injectStore } from "./utils/APIRequest";

if (import.meta.env.MODE === "production") {
  disableReactDevTools();
}

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

injectStore(store);
