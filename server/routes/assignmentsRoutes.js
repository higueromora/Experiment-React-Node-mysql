const express = require('express');
const { registerAssignmentsController , getEmployeeID_AssignmentsController, deleteAssignmentController } = require('../controllers/assignmentsController');

const router = express.Router();

router.post('/registerAssignments',registerAssignmentsController)

router.get('/getEmployeeID_Assignments',getEmployeeID_AssignmentsController)

router.delete('/deleteAssignment',deleteAssignmentController)

module.exports = router;
