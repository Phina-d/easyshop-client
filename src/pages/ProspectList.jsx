import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProspectList() {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/orders/prospects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProspects(res.data);
    } catch (err) {
      console.error("Erreur chargement prospects", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Commandes rejetées / Prospects</h2>
      {prospects.length === 0 ? (
        <p>Aucun prospect pour le moment.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Client</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Rejetée le</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((order) => (
              <tr key={order._id}>
  <td className="border p-2 text-left">{order.client?.name || "Inconnu"}</td>
  <td className="border p-2 text-right">{order.total} FCFA</td>
  <td className="border p-2 text-right">
    {new Date(order.updatedAt || order.createdAt).toLocaleDateString()}
  </td>
</tr>

            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
