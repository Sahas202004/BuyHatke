import axios from "axios";

const BASE_URL = "https://localhost:7008/api/Auth";

const register = (user) => {
    return axios.post(`${BASE_URL}/register`, user);
};

const login = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials);

    const { token, userId, userName, email } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);

    console.log(response.data);

    return response;
};

const logout = async () => {
    await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
};

const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

const getCurrentUser = () => {
    return {
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
        email: localStorage.getItem("email"),
    };
};

export default {
    register,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
};