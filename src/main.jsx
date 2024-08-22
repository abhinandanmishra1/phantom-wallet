import "./index.css";

import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { WalletProvider } from "./context/WalletProvider/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
