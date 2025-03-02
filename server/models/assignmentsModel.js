const db = require('../config/db');

const insertAssignmentsModel = (event_id, employee_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM assignments WHERE event_id = ? AND employee_id = ?',
            [event_id, employee_id],
            (err, results) => {
                if (err) return reject(err);  // Si hay un error, lo rechazamos.

                if (results.length > 0) {
                    return reject(new Error('El empleado ya está asignado a este evento'));
                }

                // Si no existe, realizamos la inserción
                db.query(
                    'INSERT INTO assignments (event_id, employee_id) VALUES (?, ?)',
                    [event_id, employee_id],
                    (err, results) => {
                        if (err) return reject(err);  // Si ocurre un error, lo rechazamos.
                        resolve(results);  // Si todo va bien, resolvemos con los resultados.
                    }
                );
            }
        );
    });
};

const deleteAssignmentsModel = (event_id, employee_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM assignments WHERE event_id = ? AND employee_id = ?',
            [event_id, employee_id],
            (err, results) => {
                if (err) return reject(err);
                if (results.affectedRows === 0) {
                    return reject(new Error('No se encontró la asignación a eliminar'));
                }
                resolve(results);
            }
        );
    });
};



const getEmployeeID_AssignmentsModel = (event_id,callback) => {
    db.query('SELECT employee_id FROM assignments WHERE event_id = ? ',
        [event_id],
        (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        }
    );
};

module.exports = { insertAssignmentsModel, getEmployeeID_AssignmentsModel, deleteAssignmentsModel };
