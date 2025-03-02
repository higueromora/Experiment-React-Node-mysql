const express = require('express');
const { register, getIdNameEmployeeController } = require('../controllers/employeeController');

const router = express.Router();

router.post('/register',register)

router.get('/getIdNameEmployee',getIdNameEmployeeController)

module.exports = router;
