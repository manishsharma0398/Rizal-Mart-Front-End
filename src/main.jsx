import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App";
import store from "./app/store";
import { injectStore } from "./utils/APIRequest";

if (import.meta.env.MODE === "production") {
  disableReactDevTools();
}

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

injectStore(store);
