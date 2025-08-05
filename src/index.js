import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);
