// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          console.warn("Token expiré");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            token,
          });
        }
      } catch (err) {
        console.error("Token invalide :", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();

    const syncAuth = () => {
      loadUser(); // 🔁 recharge à chaque changement de token
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("popstate", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("popstate", syncAuth);
    };
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    loadUser(); // ⚡ immédiat après connexion
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
