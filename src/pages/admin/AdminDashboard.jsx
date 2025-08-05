import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaClipboardList, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    ordersToConfirm: 0,
    confirmedOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Erreur chargement statistiques", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Tableau de Bord Admin 🛠️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4 border-purple-100 border-t-4">
          <FaClipboardList className="text-4xl text-yellow-500" />
          <div>
            <p className="text-gray-600">Commandes à traiter</p>
            <p className="text-xl font-bold">{stats.ordersToConfirm}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4 border-green-100 border-t-4">
          <FaCheckCircle className="text-4xl text-green-600" />
          <div>
            <p className="text-gray-600">Commandes confirmées</p>
            <p className="text-xl font-bold">{stats.confirmedOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4 border-blue-100 border-t-4">
          <FaUsers className="text-4xl text-blue-600" />
          <div>
            <p className="text-gray-600">Utilisateurs</p>
            <p className="text-xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4 border-pink-100 border-t-4">
          <FaMoneyBillWave className="text-4xl text-pink-500" />
          <div>
            <p className="text-gray-600">Total ventes</p>
            <p className="text-xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
