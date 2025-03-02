const { insertAssignmentsModel, getEmployeeID_AssignmentsModel, deleteAssignmentsModel } = require("../models/assignmentsModel");

const registerAssignmentsController = async (req, res) => {
    const { event_id, employee_id } = req.body;

    console.log('Datos recibidos en el backend:', { event_id, employee_id }); // Verifica los datos

    // Validación de los parámetros recibidos
    if (!event_id || !employee_id) {
        return res.status(400).json({ error: 'El event_id y employee_id son requeridos' });
    }

    try {
        const result = await insertAssignmentsModel(event_id, employee_id);
        res.status(201).json({ message: 'Asignación realizada exitosamente', data: result });
    } catch (error) {
        console.error('Error al insertar asignación:', error);
        res.status(500).json({ error: error.message });
    }
};


const deleteAssignmentController = async (req, res) => {
    const { event_id, employee_id } = req.body;

    if (!event_id || !employee_id) {
        return res.status(400).json({ error: 'El event_id y employee_id son requeridos' });
    }

    try {
        await deleteAssignmentsModel(event_id, employee_id);
        res.status(200).json({ message: 'Asignación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar asignación:', error);
        res.status(500).json({ error: error.message });
    }
};


const getEmployeeID_AssignmentsController = (req, res) => {
    const { event_id } = req.query

    if (!event_id) {
        return res.status(400).json({ error: 'El event_id es requerido' });
    }

    try {
        getEmployeeID_AssignmentsModel(event_id, (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: 'Error al obtener los id de empleados', details: err.message });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'No se encontraron id de empleados' });
            }

            res.status(200).json({ message: 'Id de empleados obtenidos correctamente', data: results });
        });
    } catch (error) {
        console.error('Error inesperado:', error);
        res.status(500).json({ error: 'Error interno en el servidor', details: error.message });
    }

}


module.exports = { registerAssignmentsController, getEmployeeID_AssignmentsController, deleteAssignmentController };
