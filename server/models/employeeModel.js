const db = require('../config/db');

// Buscar usuario por email
const findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const createEmployeeModel = (name, email, password, role, manager_id, callback) => {
    db.query('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', 
        [name, email, password, role, manager_id], 
        (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const getIdNameEmployeeModel = (role, manager_id, callback) => {
    db.query('SELECT id,name FROM users WHERE role = ? AND manager_id = ?',
        [role, manager_id],
        (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        }
    );
};



module.exports = { findUserByEmail, createEmployeeModel, getIdNameEmployeeModel };
