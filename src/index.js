import React from "react";
import ReactDOM from "react-dom/client";


import "./index.css";
import App from "./App";
import { ContextProvider } from "./Context";
import { Worker } from "@react-pdf-viewer/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ContextProvider>
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
    <App />
  </Worker>
  // {/* </ContextProvider> */}
);
