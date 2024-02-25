import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./context/StateContext.jsx";
import reducer, { initialState } from "./context/StateReducers.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
);
