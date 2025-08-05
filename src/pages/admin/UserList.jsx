import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur chargement utilisateurs :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/${id}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Rôle mis à jour !");
      fetchUsers();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Erreur mise à jour du rôle :", error);
      alert("Échec de la mise à jour du rôle.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Utilisateur supprimé !");
      fetchUsers();
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("Échec de la suppression.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600 font-medium">Chargement...</p>;

  // Filtrage des utilisateurs par rôle
  const admins = users.filter((u) => u.role === "admin");
  const closers = users.filter((u) => u.role === "closer");
  const chefs = users.filter((u) => u.role === "chef_service");

  // Composant tableau réutilisable
  const UserTable = ({ title, users }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      {users.length === 0 ? (
        <p className="text-gray-600 font-medium">Aucun utilisateur trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-6 text-left border-b border-gray-300">Nom</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Email</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Téléphone</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Rôle</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Changer le rôle</th>
                <th className="py-3 px-6 text-center border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-6 border-b border-gray-200">{user.name}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{user.email}</td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {user.phoneNumber || "-"}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 capitalize">
                    {user.role.replace(/_/g, " ")}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    >
                      <option value="client">Client</option>
                      <option value="closer">Closer</option>
                      <option value="chef_service">Chef de service</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-center space-x-2 whitespace-nowrap">
                    <Link
                      to={`/admin/utilisateurs/${user._id}/edit`}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    >
                      Supprimer
                    </button>
                    {user.phoneNumber && (
                      <a
                        href={`https://wa.me/${user.phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition inline-block"
                      >
                        WhatsApp
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Gestion des Utilisateurs
      </h1>

      <div className="flex justify-end mb-8">
        <Link
          to="/admin/utilisateurs/ajouter"
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
        >
          Ajouter un utilisateur
        </Link>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-300 text-green-800 p-3 mb-6 rounded text-center font-semibold">
          {message}
        </div>
      )}

      <UserTable title="Administrateurs" users={admins} />
      <UserTable title="Closers" users={closers} />
      <UserTable title="Chef de service" users={chefs} />
    </div>
  );
}
