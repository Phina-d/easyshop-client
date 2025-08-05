import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Erreur lors du chargement du produit", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
  const productWithId = {
    ...product,
    id: product._id, // ✅ Corrige le bug ici
    quantity,
  };
  addToCart(productWithId);
  setMsg(`Ajouté ${quantity} x ${product.name} au panier !`);
  setTimeout(() => setMsg(""), 3000);
};


  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!product) return <p className="text-center text-gray-500 mt-10">Produit introuvable.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/produits" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Retour aux produits
      </Link>

      {msg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center font-medium">
          {msg}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-md max-h-[400px] rounded shadow-lg object-cover"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-blue-600 text-xl font-semibold">{product.price} FCFA</p>
          <p className="text-gray-700">{product.description || "Pas de description."}</p>
          <p className="text-gray-500">Catégorie : {product.category}</p>

          <div className="flex items-center gap-4 mt-4">
            <label htmlFor="quantity" className="font-semibold">
              Quantité :
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 border rounded px-2 py-1 text-center"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
