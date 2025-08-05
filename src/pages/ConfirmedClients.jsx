import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ConfirmedClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

 const fetchConfirmedOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/orders/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setClients(res.data);
  } catch (err) {
    console.error("Erreur chargement clients confirmés", err);
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Commandes confirmées</h2>
      {clients.length === 0 ? (
        <p>Aucune commande confirmée pour le moment.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Client</th>
              <th className="border p-2">Montant</th>
              <th className="border p-2">E.mail</th>
              <th className="border p-2">Etat</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
  {clients.map((order) => (
    <tr key={order._id}>
      <td className="border p-2 text-left">
        {order.client?.name || "Inconnu"}
      </td>
      <td className="border p-2 text-right">
        {order.total} FCFA
      </td>
      <td className="border p-2 text-right">
        {order.client?.email}
      </td>
      <td className="border p-2 text-right">
        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
          {order.status}
        </span>
      </td>
      <td className="border p-2 text-right">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
