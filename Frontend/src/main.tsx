import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.scss";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element");
}
const params = new URLSearchParams(location.search);
const isStrictModeEnabled =
  params.get("isDev")?.toLowerCase() === "true";
createRoot(rootElement).render(
  <BrowserRouter>
    {isStrictModeEnabled ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    )}
  </BrowserRouter>
);
