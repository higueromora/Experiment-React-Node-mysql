import axios from "axios";

const API_URL = 'http://localhost:3000/api/employee';


// Función para registrar un empleado
export const registerEmployee = async (name, email, password, manager_id) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password, manager_id });
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en el registro');
    }
};

export const getIdNameEmployee = async (manager_id) => {
    try {
        const response = await axios.get(`${API_URL}/getIdNameEmployee`, { params: {manager_id} });
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en el registro');
    }
};
