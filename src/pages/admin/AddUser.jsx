import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "client",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/users/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Utilisateur ajouté avec succès !");
      navigate("/admin/utilisateurs");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Ajouter un utilisateur
      </h1>

      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Nom
          </label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Entrez le nom complet"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="exemple@domaine.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Mot de passe
          </label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Votre mot de passe"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">
            Téléphone (WhatsApp)
          </label>
          <input
            name="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Ex: 221771234567"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
            Rôle
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="client">Client</option>
            <option value="closer">Closer</option>
            <option value="chef_service">Chef de service</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Enregistrement..." : "Ajouter l'utilisateur"}
        </button>
      </form>
    </div>
  );
}
