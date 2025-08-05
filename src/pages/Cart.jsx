import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useContext(CartContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Votre panier est vide !");
    } else {
      navigate("/checkout");
    }
  };

  const changeQuantity = (id, newQty) => {
    if (newQty < 1) return;
    updateQuantity(id, newQty);
    setMessage("Quantité mise à jour !");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setMessage("Produit supprimé du panier !");
    setTimeout(() => setMessage(""), 2000);
  };

  if (cart.length === 0)
    return <p className="p-6 text-center text-gray-600">Votre panier est vide.</p>;

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Votre Panier</h2>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded shadow"
          >
            <div className="flex items-center gap-4 w-full sm:w-1/2 mb-4 sm:mb-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.price} €</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <button
                onClick={() => changeQuantity(item._id, item.quantity - 1)}
                className="bg-gray-200 px-2 rounded hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) changeQuantity(item._id, val);
                }}
                className="w-14 text-center border rounded py-1"
              />
              <button
                onClick={() => changeQuantity(item._id, item.quantity + 1)}
                className="bg-gray-200 px-2 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="text-sm font-semibold">
              {(item.price * item.quantity).toFixed(2)} €
            </div>

            <button
              onClick={() => handleRemove(item._id)}
              className="mt-2 sm:mt-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold mb-4">Total : {total.toFixed(2)} €</h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={() => {
              clearCart();
              setMessage("Panier vidé !");
              setTimeout(() => setMessage(""), 2000);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Vider le panier
          </button>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
              cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Passer la commande
          </button>
        </div>
      </div>
    </section>
  );
}
