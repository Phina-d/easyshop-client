import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="text-center">
        <AlertTriangle className="text-red-500 mx-auto mb-4" size={64} />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page introuvable</h1>
        <p className="text-gray-600 mb-6">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
