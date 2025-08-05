import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  // 🔧 Définir l'URL de l'image
  const imageUrl = `http://localhost:5000${product.image}`;

  return (
    <div className="border rounded p-4 shadow flex flex-col items-center">
      <img
  src={imageUrl}
  alt={product.name}
  className="w-full h-48 object-cover rounded mb-3"
/>
      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
      <p className="text-purple-600 font-bold mb-3">{product.price} €</p>
      <div className="flex space-x-2">
        <Link
          to={`/produit/${product.id}`}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Voir détails
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
