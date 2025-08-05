// src/components/GoToCartButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function GoToCartButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/panier");
  };

  return (
    // GoToCartButton.jsx
<button
  onClick={handleClick}
  className="fixed bottom-6 right-20 bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition z-50"
  aria-label="Aller au panier"
>
  <FaShoppingCart size={16} />
</button>


  );
}
