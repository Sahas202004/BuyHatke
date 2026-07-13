import axios from "axios";

const BASE_URL = "https://localhost:7008/api/Customers";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const getAllCustomers = () => {
    return axios.get(BASE_URL, getAuthHeader());
};

const getCustomerById = (id) => {
    return axios.get(`${BASE_URL}/${id}`, getAuthHeader());
};

const addCustomer = (customer) => {
    return axios.post(`${BASE_URL}/add`, customer, getAuthHeader());
};

export default {
    getAllCustomers,
    getCustomerById,
    addCustomer
};