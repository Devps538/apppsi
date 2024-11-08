// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // IP da sua máquina
});

export default api;
