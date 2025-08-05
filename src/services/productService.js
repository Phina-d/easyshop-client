import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createProduct = async (productData) => {
  // productData est un FormData
  const res = await axios.post(API_URL, productData, getAuthHeaders());
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_URL}/${id}`, productData, getAuthHeaders());
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return res.data;
};
