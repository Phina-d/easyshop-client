import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await login(data.token); // Connexion automatique après inscription
        navigate("/"); // Redirection vers la page d’accueil
      } else {
        alert(data.message || "Erreur d'inscription");
      }
    } catch (err) {
      alert("Erreur serveur, réessayez plus tard.");
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
          Inscription
        </h2>
        <label className="block mb-2 font-semibold text-gray-700">Nom complet</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Votre nom complet"
        />
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
          Créer un compte
        </button>
        <p className="mt-4 text-center text-gray-600">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
