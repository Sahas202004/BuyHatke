import axios from "axios";

const BASE_URL = "https://localhost:7008/api/Products";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const getAllProducts = () => {
    return axios.get(BASE_URL, getAuthHeader());
};

const getProductById = (id) => {
    return axios.get(`${BASE_URL}/${id}`, getAuthHeader());
};

const addProduct = (product) => {
    return axios.post(BASE_URL, product, getAuthHeader());
};

const updateProduct = (id, product) => {
    return axios.put(`${BASE_URL}/${id}`, product, getAuthHeader());
};

const deleteProduct = (id) => {
    return axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
};

export default {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};