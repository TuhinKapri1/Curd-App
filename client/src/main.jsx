import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./provider/ReactQueryProvider.jsx";
import toast, { Toaster } from "react-hot-toast";
import ReduxProvider from "./provider/ReduxProvider.jsx";
createRoot(document.getElementById("root")).render(
  <ReactQueryProvider>
    <BrowserRouter>
      <ReduxProvider>
        <App />
        <Toaster />
      </ReduxProvider>
    </BrowserRouter>
  </ReactQueryProvider>
);
