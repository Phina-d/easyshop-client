import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";


export default function Confirmation() {
 const { cart, total, clearCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();


  const client = location.state || {
    nom: "Invité",
    email: "inconnu@example.com",
    adresse: "Non renseignée",
  };

  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Générer le code une fois au montage
  useEffect(() => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setCode(randomCode.toString());
  }, []);

const handleConfirmCode = async () => {
  if (userCode !== code) {
    return alert("❌ Code incorrect !");
  }

  setIsConfirmed(true);

  // 🛒 Convertir panier en format attendu par l'API
  const productsToSend = cart.map((item) => ({
    productId: item._id || item.id,
    quantity: item.quantity,
  }));

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        products: productsToSend,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erreur commande");
    }

     // ✅ Appelle maintenant l’envoi d’e-mail
    await handleSendEmail();

   alert("✅ Commande confirmée, enregistrée et facture envoyée !");
    clearCart();  // <-- vide le panier ici
    navigate("/clients");
  } catch (err) {
    console.error("❌ Erreur création commande :", err);
    alert("❌ Échec : " + err.message);
  }
};


 const handleSendEmail = async () => {
    // if (!isConfirmed) {
    //   alert("❌ Veuillez confirmer votre commande avec le code avant !");
    //   return;
    // }

     // ✅ Logs utiles pour déboguer
  console.log("📤 Envoi email à :", client.email);
  console.log("🛒 Contenu du panier :", cart);
  console.log("💰 Total :", total);

    try {
      const response = await fetch("http://localhost:5000/api/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: client.email,
          subject: "Facture EasyShop",
          cart,
          total,
          client: {
            name: client.nom,
            address: client.adresse,
          },
        }),
      });

      const data = await response.json();
      // 🔍 Log de la réponse serveur
    console.log("📨 Réponse serveur :", data);
      if (response.ok) {
        alert("📧 Facture envoyée avec succès !");
      } else {
        alert(`❌ Échec de l'envoi : ${data.message || "Erreur inconnue"}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("❌ Une erreur est survenue.");
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Merci pour votre commande !
      </h2>

      <div className="mb-6 p-4 border rounded bg-gray-50 print:bg-white">
        <h3 className="text-xl font-bold mb-4">Facture</h3>

        <div className="mb-4">
          <p><strong>Nom :</strong> {client.nom}</p>
          <p><strong>Email :</strong> {client.email}</p>
          <p><strong>Adresse :</strong> {client.adresse}</p>
        </div>

        <table className="w-full border-collapse mb-4 text-sm">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="p-2 text-left">Produit</th>
              <th className="p-2 text-left">Quantité</th>
              <th className="p-2 text-left">Prix unitaire</th>
              <th className="p-2 text-left">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.price} FCFA</td>
                <td className="p-2">
                  {(item.price * item.quantity).toFixed(2)} FCFA
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-right text-lg font-bold">
          Total : {total.toFixed(2)} FCFA
        </h3>
      </div>

      <div className="mb-4 text-center no-print">
        <p className="mb-2 text-gray-700">
          Veuillez confirmer votre commande avec ce code :
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Entrez le code à 6 chiffres"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="border px-4 py-2 rounded text-center w-48"
          />
          <button
            onClick={handleConfirmCode}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Confirmer le code
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">Votre code : <strong>{code}</strong></p>
      </div>

      <div className="flex flex-col items-center gap-4 no-print">
        <Link
          to="/cart"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          🛒 Modifier la commande
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          🧾 Imprimer la facture
        </button>
        <button
          onClick={handleSendEmail}
          disabled={!isConfirmed}
          className={`bg-green-600 text-white px-6 py-2 rounded ${
            isConfirmed ? "hover:bg-green-700" : "opacity-50 cursor-not-allowed"
          }`}
        >
          📧 Envoyer la facture
        </button>
      </div>
    </section>
  );
}
