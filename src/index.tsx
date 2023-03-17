import React from "react";

import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import App from "./App";

import { UsersApi } from "./rtkQueryCalls/apiSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

root.render(
  <React.StrictMode>
    <ApiProvider api={UsersApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
