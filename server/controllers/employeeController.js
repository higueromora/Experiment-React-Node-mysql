const bcrypt =require('bcryptjs')

const { findUserByEmail, createEmployeeModel, getIdNameEmployeeModel  } = require('../models/employeeModel');

const register = (req, res) => {
    const {name, email, password, manager_id} = req.body;

    const role = 'employee';

    findUserByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        try{
            const hashedPassword = await bcrypt.hash(password, 10)

            createEmployeeModel(name, email, hashedPassword, role, manager_id, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            });
        }catch (error) {
            res.status(500).json({ error: 'Error al encriptar la contraseña' });
        }

    })

}

const getIdNameEmployeeController = (req, res) => {
    const { manager_id } = req.query;

    const role = 'employee';

    if (!manager_id) {
        return res.status(400).json({ error: 'El manager_id es requerido' });
    }

    console.log('Recibido manager_id:', manager_id);  // Verifica qué se recibe

    try {
        getIdNameEmployeeModel(role,manager_id, (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: 'Error al obtener los empleados', details: err.message });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'No se encontraron empleados' });
            }

            res.status(200).json({ message: 'Empleados obtenidos correctamente', data: results });
        });
    } catch (error) {
        console.error('Error inesperado:', error);
        res.status(500).json({ error: 'Error interno en el servidor', details: error.message });
    }
};



module.exports = {register, getIdNameEmployeeController}
