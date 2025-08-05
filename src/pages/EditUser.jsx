import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Erreur lors du chargement de l'utilisateur");
        const data = await res.json();
        setUser({ name: data.name, email: data.email, role: data.role });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur lors de la sauvegarde");
      }
      alert("Utilisateur mis à jour avec succès !");
      navigate("/admin/utilisateurs");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier l'utilisateur</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">Nom</label>
          <input
            id="name"
            name="name"
            type="text"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="role">Rôle</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Sélectionnez un rôle --</option>
            <option value="admin">Administrateur</option>
            <option value="chef_service">Chef de service</option>
            <option value="closer">Closer</option>
            <option value="client">Client</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {saving ? "Sauvegarde..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}
