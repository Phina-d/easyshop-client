import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export default function AdminProduits() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageFile: null,
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}?page=${page}&limit=15`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des produits");
      console.error("Erreur fetchProducts:", err);
    } finally {
      setLoading(false);
    }
  }, [page]); // ⚠️ 'page' est nécessaire ici

  useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    if (formData.imageFile) formDataToSend.append("image", formData.imageFile);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct._id}`, formDataToSend, config);
      } else {
        await axios.post(API_URL, formDataToSend, config);
      }

      setFormData({ name: "", price: "", description: "", imageFile: null });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      imageFile: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer ce produit ?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Erreur handleDelete:", err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Gestion des Produits</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 mb-10 bg-white p-6 rounded shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="border rounded px-4 py-2"
        />
        <input
          type="file"
          name="imageFile"
          onChange={handleChange}
          accept="image/*"
          className="border px-4 py-2"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {editingProduct ? "Mettre à jour" : "Ajouter"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setFormData({ name: "", price: "", description: "", imageFile: null });
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-center text-blue-600">Chargement des produits...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit disponible.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 text-center bg-white"
              >
                {p.image && (
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p className="font-bold text-blue-600 mt-2">{p.price} FCFA</p>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ PAGINATION */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              ◀ Précédent
            </button>
            <span>Page {page} / {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Suivant ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
