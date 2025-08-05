// src/routes/PrivateRouteAdmin.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateRouteAdmin({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;

  }

  try {
    const decoded = jwtDecode(token);
    const allowedRoles = ["admin", "chef", "closer"];

    if (allowedRoles.includes(decoded.role)) {
      return children;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch (err) {
    console.error("Erreur de décodage du token", err);
    return <Navigate to="/login" />;
  }
}
