import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

// Función para hacer login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data
    } catch (error) {
        throw new Error('Error de login');
    }
};

// Función para registrar un usuario
export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response.data;  // Retorna el mensaje del backend
    } catch (error) {
        throw new Error('Error en el registro');
    }
};

