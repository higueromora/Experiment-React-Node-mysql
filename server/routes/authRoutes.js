const express = require('express');
const { login, register, home, registerEmployee } = require('../controllers/authController');

const router = express.Router();

router.get('/', home);

// Ruta para login
router.post('/login', login);

// Ruta para registro de manager
router.post('/register', register);

// Ruta para registro de empleados (solo accesible después de login)
router.post('/register/employee', registerEmployee);


module.exports = router;
