const { createEvent, getEventsModel, updateModel, deleteEventModel } = require('../models/eventModel');


const registerEvent = (req, res) => {
    const { title, description, date, type, managerId } = req.body;

    if (!title || !description || !date || !type || !managerId) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        createEvent(title, description, date, type, managerId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Evento registrado exitosamente', data: result });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el evento' });
    }
};

const getEventController = (req, res) => {
    const { managerId } = req.query;

    if (!managerId) {
        return res.status(400).json({ error: "Es necesario el id del manager" });
    }

    try {
        getEventsModel(managerId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Eventos obtenidos', data: result });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener eventos' });
    }

}

const updateEventController = (req, res) => {
    const { id } = req.params;
    const { title, description, date, type } = req.body;

    if (!id) {
        return res.status(400).json({ error: "El id del evento es obligatorio" });
    }

    if (!title && !description && !date && !type) {
        return res.status(400).json({ error: "Al menos uno de los campos (title, description, date, type) debe ser proporcionado" });
    }

    try {
        updateModel(id, { title, description, date, type }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Evento no encontrado" });
            }
            res.status(200).json({ message: "Evento actualizado correctamente" });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el evento' });
    }
};

const deleteEventController = (req, res) => {
    const { id } = req.params;

    deleteEventModel(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }
        res.status(200).json({ message: "Evento eliminado correctamente" });
    });
};

module.exports = { registerEvent, getEventController, updateEventController, deleteEventController };
