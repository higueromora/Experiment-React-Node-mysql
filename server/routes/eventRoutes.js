const express = require('express');
const { registerEvent, getEventController, updateEventController, deleteEventController } = require('../controllers/eventController');

const { home} = require('../controllers/authController');

const router = express.Router();

router.get('/', home);

router.post('/registerEvent', registerEvent);

router.get('/getEvents', getEventController);

router.put('/updateEvent/:id', updateEventController);

router.delete('/deleteEvent/:id', deleteEventController);

module.exports = router;