

import axios from 'axios';

const authToken = localStorage.getItem('token');
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Corrected the property name to baseURL
    headers: {
        'auth-token': authToken, // Include the token in the Authorization header
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Optional timeout setting
});
export default axiosInstance;

