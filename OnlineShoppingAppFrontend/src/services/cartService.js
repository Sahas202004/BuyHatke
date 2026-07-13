import axios from "axios";

const BASE_URL = "https://localhost:7008/api/Cart";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const getCart = (userId) => {
    return axios.get(`${BASE_URL}/${userId}`, getAuthHeader());
};

const addToCart = (dto) => {
    return axios.post(`${BASE_URL}/add`, dto, getAuthHeader());
};

const updateQuantity = (cartItemId, quantity) => {
    return axios.put(
        `${BASE_URL}/updateQuantity?cartItemId=${cartItemId}&quantity=${quantity}`,
        {},
        getAuthHeader()
    );
};

const removeFromCart = (cartItemId) => {
    return axios.delete(`${BASE_URL}/remove/${cartItemId}`, getAuthHeader());
};

const clearCart = (userId) => {
    return axios.delete(`${BASE_URL}/clear/${userId}`, getAuthHeader());
};

const checkout = (userId) => {
    return axios.get(`${BASE_URL}/checkout/${userId}`, getAuthHeader());
};

export default {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout
};