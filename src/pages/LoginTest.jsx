import React, { useState } from "react";

export default function LoginTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

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
        localStorage.setItem("token", data.token);
        setToken(data.token);
        alert("Connexion réussie !");
      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (err) {
      alert("Erreur serveur");
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <h1>Test Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Se connecter</button>
      </form>

      {token && (
        <div className="mt-4">
          <h2>✅ Token reçu :</h2>
          <pre>{token}</pre>
        </div>
      )}
    </div>
  );
}
