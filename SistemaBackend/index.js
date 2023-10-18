const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
}));

app.use(express.json()); // Habilita el uso de JSON en las solicitudes

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER1,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get('/datos', async (req, res) => {
    const userParam = req.query.user;
    const passwordParam = req.query.password;

    const sql = 'SELECT * FROM Usuarios WHERE user = ? AND password = ?';

    try {
        const result = await queryDB(sql, [userParam, passwordParam]);
        const userData = result[0]; 

        if (userData) {
            res.json({ status: true });
        } else {
            res.json({ status: false });
        }
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error al obtener los datos');
    }
});

function queryDB(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.post('/insertar-temperatura', async (req, res) => {
    const { valorTemperatura, idSensor } = req.body;

    const sql = 'INSERT INTO Temperatura (valorTemperatura, idSensor) VALUES (?, ?)';

    try {
        await queryDB(sql, [valorTemperatura, idSensor]);
        res.json({ status: true, message: true });
    } catch (err) {
        console.error('Error al insertar datos de temperatura:', err);
        res.status(500).send('Error al insertar datos de temperatura');
    }
});

app.post('/insertar-conteo', async (req, res) => {
    const { idContador } = req.body;

    const sql = 'INSERT INTO Conteo (idContador) VALUES (?)';

    try {
        await queryDB(sql, [idContador]);
        res.json({ status: true, message: true });
    } catch (err) {
        console.error('Error al insertar dato de conteo:', err);
        res.status(500).send('Error al insertar dato de conteo');
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
