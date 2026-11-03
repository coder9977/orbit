import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.scss";
import { IS_DEV } from "./config/config";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element");
}
createRoot(rootElement).render(
  <BrowserRouter>
    {IS_DEV ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    )}
  </BrowserRouter>
);
