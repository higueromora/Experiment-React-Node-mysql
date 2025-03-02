const db = require('../config/db');


const createEvent = (title, description, date, type, managerId, callback) => {
    db.query('INSERT INTO events (title, description, date, type, manager_id) VALUES (?, ?, ?, ?, ?)', 
        [title, description, date, type, managerId],
        (err, results) => {
            if (err) {
                console.error('Error al insertar en la base de datos:', err);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
};

const getEventsModel = (managerId, callback) => {
    db.query('SELECT * FROM events WHERE manager_id = ?',
        [managerId],
        (err,results) =>{
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

// TODO para obtener eventos que pertenecen al empleado
// SELECT e.*
// FROM events e
// JOIN assignments a ON e.id = a.event_id
// WHERE a.employee_id = 2;


const updateModel = (eventId, updatedData, callback) => {
    const { title, description, date, type } = updatedData;

    db.query(
        `UPDATE events 
         SET title = ?, 
             description = ?, 
             date = ?, 
             type = ? 
         WHERE id = ?`,
        [title, description, date, type, eventId],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar en la base de datos:', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
};

const deleteEventModel = (eventId, callback) => {
    db.query('DELETE FROM events WHERE id = ?', [eventId], (err, results) => {
        if (err) {
            console.error('Error al eliminar en la base de datos:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};


module.exports = { createEvent, getEventsModel, updateModel, deleteEventModel };
