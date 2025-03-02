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

// Crear un nuevo usuario (con el manager_id si es necesario)
const createUser = (name, email, password, role, manager_id, callback) => {
    db.query('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', 
        [name, email, password, role, manager_id], 
        (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};


module.exports = { findUserByEmail, createUser };
