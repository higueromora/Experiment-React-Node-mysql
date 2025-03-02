const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

// Respuesta de prueba para asegurar que el servidor esté funcionando
const home = (req, res) => {
    res.send('Servidor funcionando correctamente!');
};

// Login: Registra al usuario y genera JWT
// TODO  guardar en cookie en lugar de localstorage el role de usuario
const login = (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Correo no registrado' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });

            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            res.json({
                message: 'Login exitoso',
                userId: user.id,
                userName: user.name,
                userRole: user.role
            });
        });
    });
};

// Registro: Cuando un usuario se registra, por defecto es manager
const register = (req, res) => {
    const { name, email, password } = req.body;

    // Establecer el rol por defecto como "manager"
    const role = 'manager';

    // Verificar si el usuario ya existe
    findUserByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        try {
            // Hashear la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario en la base de datos
            createUser(name, email, hashedPassword, role, null, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al encriptar la contraseña' });
        }
    });
};

// Registro de empleados por parte de un manager
const registerEmployee = (req, res) => {
    const { name, email, password, managerId } = req.body;

    // Verificar si el usuario ya existe
    findUserByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        try {
            // Hashear la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el empleado en la base de datos
            const role = 'employee';  // Definir que es un empleado
            createUser(name, email, hashedPassword, role, managerId, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(201).json({ message: 'Empleado registrado exitosamente' });
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al encriptar la contraseña' });
        }
    });
};

module.exports = { home, login, register, registerEmployee };
