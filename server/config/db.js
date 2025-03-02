const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234pepe",
    database: "manageteam",
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

module.exports = db;
