import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const API_URL = "http://localhost:5000/api/products/public";

export default function ProductGallery() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);

        // Correction ici : s'assurer que res.data est un tableau ou contient un tableau
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProducts(data || []);
      } catch (err) {
        console.error("Erreur chargement produits:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (categoryFilter === "Tous" || product.category === categoryFilter) &&
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.name} ajouté au panier !`);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const categories = ["Tous", ...new Set(products.map((p) => p.category))];

  return (
    <section className="p-6 max-w-7xl mx-auto relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">Tous les produits</h2>

      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">Aucun produit trouvé.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded p-4 shadow flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              {product.image && (
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded shadow hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              )}
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-blue-600 font-bold mb-3">{product.price} FCFA</p>

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Ajouter au panier
              </button>

              <Link
                to={`/produits/${product._id}`}
                className="mt-2 text-blue-500 hover:underline"
              >
                Voir le produit
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
