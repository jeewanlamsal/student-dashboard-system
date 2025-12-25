import axios from 'axios';

const API_URL= import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API = axios.create({
    baseURL: API_URL, // Your backend URL
});

// "Interceptor" - This runs before every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;