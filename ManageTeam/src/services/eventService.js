import axios from 'axios';

const API_URL = 'http://localhost:3000/api/events';


// Función para registrar un evento
export const registerEvent = async (title, description, date, type, managerId) => {
    try {
        console.log(title, description, date, type, managerId)
        const response = await axios.post(`${API_URL}/registerEvent`, { title, description, date, type, managerId });

        // Mostrar la respuesta completa de la API
        console.log('Respuesta del servidor:', response);

        return response.data;  // Retorna el mensaje del backend
    } catch (error) {
        throw new Error('Error en el registro');
    }
};

// Función para actualizar un evento
export const updateEvent = async (title, description, date, type, eventId) => {
    try {
        console.log(title, description, date, type, eventId)
         const response = await axios.put(`${API_URL}/updateEvent/${eventId}`, { title, description, date, type });

        // Mostrar la respuesta completa de la API
        console.log('Respuesta del servidor:', response);

        return response.data;  // Retorna el mensaje del backend
    } catch (error) {
        throw new Error('Error en el registro');
    }
};

// Función para borrar un evento
export const deleteEvent = async (eventId) => {
    try {
        console.log(`Eliminando evento con ID: ${eventId}`);
        const response = await axios.delete(`${API_URL}/deleteEvent/${eventId}`);

        console.log('Respuesta del servidor:', response);
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar el evento');
    }
};

// Función para obtener eventos del usuario
export const getEvent = async (managerId) => {
    try {
        const response = await axios.get(`${API_URL}/getEvents`, { params: { managerId } });

        // Mostrar la respuesta completa de la API
        console.log('Respuesta del servidor:', response);

        return response.data; 
    } catch (error) {
        throw new Error('Error en el registro');
    }
}
