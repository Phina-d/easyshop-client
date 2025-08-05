import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, Trash2, PackageCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // 🔄 Charger les commandes à confirmer
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/to-confirm", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des commandes");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Confirmer commande + redirection vers /produits
  const confirmOrder = async (orderId) => {
    try {
      await axios.patch(`/api/orders/confirm/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Commande confirmée");
      setTimeout(() => navigate("/produits"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Erreur confirmation");
    }
  };

  // ❌ Rejeter commande
  const rejectOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Commande supprimée");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Erreur suppression");
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600">
        <PackageCheck size={24} /> Commandes à confirmer
      </h2>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2">Client</th>
            <th className="p-2">Montant</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                Aucune commande à confirmer.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order.client?.name || "Client inconnu"}</td>
                <td className="p-2">{order.total} FCFA</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => confirmOrder(order._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                    type="button"
                  >
                    <CheckCircle2 size={16} /> Confirmer
                  </button>
                  <button
                    onClick={() => rejectOrder(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                    type="button"
                  >
                    <Trash2 size={16} /> Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
