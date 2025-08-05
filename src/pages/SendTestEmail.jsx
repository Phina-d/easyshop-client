import React, { useState } from "react";
import axios from "axios";

export default function SendTestEmail() {
  const [email, setEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    const token = localStorage.getItem("token");

    const emailData = {
      to: email,
      subject: "Confirmation de votre commande",
      client: { name: clientName },
      total: 45000,
      cart: [
        { name: "Bracelet en or", quantity: 2, price: 15000 },
        { name: "Parfum Dior", quantity: 1, price: 15000 }
      ]
    };

    try {
      await axios.post(`/api/orders/${orderId}/send-email`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setStatus("✅ E-mail envoyé avec succès.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Échec de l'envoi de l'e-mail.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Envoyer un e-mail de test</h2>

      <input
        type="text"
        placeholder="ID de la commande"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="email"
        placeholder="Email du client"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Nom du client"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={sendEmail}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Envoyer l’e-mail
      </button>

      {status && (
        <p className="mt-4 text-center font-semibold">
          {status}
        </p>
      )}
    </div>
  );
}
