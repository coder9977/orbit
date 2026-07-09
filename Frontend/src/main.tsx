import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element");
}
const params = new URLSearchParams(location.search);
const isStrictModeEnabled =
  params.get("isDev")?.toLowerCase() === "true";
createRoot(rootElement).render(
  <>
    {isStrictModeEnabled ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    )}
  </>,
);
