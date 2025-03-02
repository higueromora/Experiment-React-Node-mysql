const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes')
const employeRoutes = require('./routes/employeeRoutes')
const registerAssignmentsRoutes = require('./routes/assignmentsRoutes')
const db = require('./config/db');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
}));


// Rutas
app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/employee', employeRoutes);

app.use('/api/assignments', registerAssignmentsRoutes);

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
