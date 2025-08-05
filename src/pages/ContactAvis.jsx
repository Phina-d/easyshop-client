import React, { useState, useEffect } from "react";
import "./ContactAvis.css";  // <-- importe le CSS ici
export default function ContactAvis() {
  const [avis, setAvis] = useState(() => {
    // Charger les avis depuis localStorage au démarrage
    const storedAvis = localStorage.getItem("avisClients");
    return storedAvis ? JSON.parse(storedAvis).map(a => ({
      ...a,
      date: new Date(a.date), // retransformer la date en objet Date
    })) : [];
  });

  const [newAvis, setNewAvis] = useState("");
  const [contact, setContact] = useState({
    nom: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Sauvegarder dans localStorage à chaque modification des avis
    localStorage.setItem("avisClients", JSON.stringify(avis));
  }, [avis]);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleAvisSubmit = (e) => {
    e.preventDefault();
    if (newAvis.trim()) {
      setAvis([{ text: newAvis, date: new Date() }, ...avis]);
      setNewAvis("");
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Merci pour votre message !");
    setContact({ nom: "", email: "", message: "" });
  };

  // Fonction pour supprimer un avis par index
  const handleDeleteAvis = (indexToDelete) => {
    setAvis(avis.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Section À propos */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700">À propos de EasyShop</h2>
        <p className="text-gray-600">
          EasyShop est une boutique en ligne dédiée à rendre votre expérience de shopping fluide,
          agréable et sécurisée. Nous sélectionnons avec soin des produits de qualité pour répondre
          à vos besoins du quotidien.
        </p>
      </section>

      {/* Formulaire de contact */}
      <section className="bg-gray-100 p-6 rounded shadow">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Nous contacter</h3>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <input
            type="text"
            name="nom"
            value={contact.nom}
            onChange={handleContactChange}
            placeholder="Votre nom"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleContactChange}
            placeholder="Votre adresse email"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            value={contact.message}
            onChange={handleContactChange}
            placeholder="Votre message"
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Envoyer
          </button>
        </form>
      </section>

      {/* Formulaire d’avis */}
      <section className="bg-white p-6 border rounded shadow">
        <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Laissez votre avis</h3>
        <form onSubmit={handleAvisSubmit} className="space-y-4">
          <textarea
            value={newAvis}
            onChange={(e) => setNewAvis(e.target.value)}
            placeholder="Votre avis ici..."
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Envoyer l’avis
          </button>
        </form>
      </section>

      {/* Liste des avis */}
      {avis.length > 0 && (
        <section className="bg-gray-50 p-6 border rounded shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Avis des clients</h3>
          <ul className="space-y-3">
            {avis.map((a, index) => (
              <li key={index} className="bg-white p-4 rounded shadow-sm flex justify-between items-start">
                <div>
                  <p className="text-gray-800">{a.text}</p>
                  <span className="text-sm text-gray-400">
                    {a.date.toLocaleDateString()} à {a.date.toLocaleTimeString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteAvis(index)}
                  className="text-red-600 hover:text-red-800 font-semibold ml-4"
                  aria-label="Supprimer cet avis"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

