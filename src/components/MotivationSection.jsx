// src/components/MotivationSection.jsx
import React from "react";

export default function MotivationSection() {
  return (
    <section className="bg-purple-50 text-gray-800 py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        {/* Texte à gauche */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">Notre Philosophie</h2>

          <blockquote className="text-xl italic text-purple-800 mb-6 max-w-lg mx-auto md:mx-0">
            “Le succès n'est pas final. L'échec n'est pas fatal. C'est le courage de continuer qui compte.”
          </blockquote>

          <blockquote className="text-lg italic text-purple-600 mb-6 max-w-lg mx-auto md:mx-0">
            “Le succès est la capacité d'aller d'échec en échec sans perdre son enthousiasme.”
          </blockquote>

          <p className="mb-6 max-w-lg mx-auto md:mx-0">
            EasyShop vous offre une expérience d’achat simple, rapide et sécurisée. Profitez des meilleurs produits aux meilleurs prix, livrés directement chez vous au Sénégal.
          </p>

          <ul className="motivation-list list-none max-w-lg mx-auto md:mx-0 text-left">
            <li className="mb-2">✔ Livraison rapide partout au Sénégal</li>
            <li className="mb-2">✔ Paiement sécurisé & support client</li>
            <li className="mb-2">✔ Nouveautés chaque semaine</li>
          </ul>
        </div>

        {/* Image à droite */}
        <div className="flex-1 max-w-md">
          <img
  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
  alt="Shopping motivant"
  className="rounded-lg shadow-lg"
/>

        </div>
      </div>
    </section>
  );
}
