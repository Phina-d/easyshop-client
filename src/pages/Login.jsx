import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem("token"); // Nettoyage si retour manuel
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await login(data.token);
        navigate("/"); // Pas besoin de recharger la page
      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (err) {
      alert("Erreur serveur, réessayez plus tard");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Connexion
        </h2>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="exemple@domain.com"
        />
        <label className="block mb-2 font-semibold text-gray-700">Mot de passe</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Se connecter
        </button>
        <p className="mt-4 text-center text-gray-600">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Créez-en un
          </Link>
        </p>
      </form>
    </div>
  );
}
