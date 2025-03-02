import axios from 'axios';

const API_URL = 'http://localhost:3000/api/assignments';


// Función para asignar eventos
export const registerAssignments = async (event_id, employee_id) => {
    try {
        const response = await axios.post(`${API_URL}/registerAssignments`, { event_id, employee_id });
        return response.data;
    } catch (error) {
        throw new Error('Error en el registro');
    }
};


// Función para borrar eventos
export const deleteAssignments = async (event_id, employee_id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteAssignment`, { 
            data: { event_id, employee_id }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar asignación');
    }
};

// Función para asignar eventos
export const getEmployeeID_Assignments = async (event_id) => {
    try {
        const response = await axios.get(`${API_URL}/getEmployeeID_Assignments`, { params : {event_id} });
        return response.data;  // Retorna el mensaje del backend
    } catch (error) {
        throw new Error('Error en el registro');
    }
};