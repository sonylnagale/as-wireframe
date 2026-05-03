import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import App from "./App";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);

