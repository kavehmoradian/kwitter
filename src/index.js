import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { initializeParse } from "@parse/react";
import { AuthProvider } from "./contexts/authContext";

initializeParse(

);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
