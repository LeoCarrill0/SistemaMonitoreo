const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

app.use(cors({
  //origin: 'http://10.42.0.1:4200',
  // origin: 'http://192.168.1.7:4200',
  // origin: 'http://10.42.0.1',
  // origin: 'http://192.168.0.18:4200',
  origin: 'http://localhost:4200',
}));


app.use(express.json());

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
  console.log('Conectado a la base de datos...');
});

app.get('/ValidarUsuario', async (req, res) => {
  const userParam = req.query.user;
  const passwordParam = req.query.password;

  const secretKey = process.env.KEYTOKEN; 
  const sql = 'SELECT user, password, prioridadUsuario, enable FROM Usuarios WHERE user = ? AND password = ?';

  try {
    const result = await queryDB(sql, [userParam, passwordParam]);
    const userData = result[0];
    if (userData) {
      //res.json({ status: true });
      const token = jwt.sign({ username: userParam }, secretKey, { expiresIn: '1h' });
      //res.json({ token });
      res.json({ status: true, key: token });
    } else {
      res.json({ status: false });
    }
  } catch (err) {
    res.status(500).send('Error al obtener los datos ' + err);
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

app.post('/insertTemperatura', async (req, res) => {
  const { valorTemperatura, idSensor } = req.body;

  const sql = 'INSERT INTO Temperatura (valorTemperatura, idSensor) VALUES (?, ?)';

  try {
    await queryDB(sql, [valorTemperatura, idSensor]);
    res.json({ status: true, message: true });
  } catch (err) {
    res.status(500).send('Error al insertar datos de temperatura ' + err);
  }
});

app.post('/insertConteo', async (req, res) => {
  const { idContador } = req.body;

  const sql = 'INSERT INTO Conteo (idContador) VALUES (?)';

  try {
    await queryDB(sql, [idContador]);
    res.json({ status: true, message: true });
  } catch (err) {
    res.status(500).send('Error al insertar dato de conteo ' + err);
  }
});

app.post('/insertUsuario', async (req, res) => {
  const { user, password, prioridadUsuario } = req.body;

  const sql = 'INSERT INTO Usuarios (user, password, prioridadUsuario, enable) VALUES (?, ?, ?, ?)';

  try {
    await queryDB(sql, [user, password, prioridadUsuario, 1]);
    res.json({ status: true, message: true });
  } catch (err) {
    res.status(500).send('Error al insertar usuario ' + err);
    console.error(err)
  }
});


app.get('/obtenerDatos', async (req, res) => {
  const tipoConsulta = req.query.tipo;
  switch (tipoConsulta) {
    case 'T':
      const idSensor = req.query.idSensor;
      const inicio = req.query.inicio;
      const fin = req.query.fin;
      await obtenerDatosTemperatura(idSensor, inicio, fin, res);
      break;
    case 'Tu':
      const idSensorUltimo = req.query.idSensor;
      await obtenerUltimoDatoTemperatura(idSensorUltimo, res);
      break;
    case 'C':
      const idContador = req.query.idContador;
      const inicioC = req.query.inicio;
      const finC = req.query.fin;
      await obtenerTotalDatosConteo(idContador, inicioC, finC, res);
      break;
    case 'Cu':
      const idContadorActual = req.query.idContador;
      await obtenerTotalDatosConteoHoy(idContadorActual, res);
      break;
    default:
      res.status(400).send('Tipo de consulta no válido');
      break;
  }
});

async function obtenerDatosTemperatura(idSensor, inicio, fin, res) {
  const sql = 'SELECT IdTemperatura, valorTemperatura, idSensor, fechaTemperatura FROM Temperatura WHERE idSensor = ? AND fechaTemperatura BETWEEN ? AND ?';
  try {
    const result = await queryDB(sql, [idSensor, inicio, fin]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener datos de temperatura:', err);
    res.status(500).send('Error al obtener datos de temperatura');
  }
}

async function obtenerTotalDatosConteo(idContador, inicio, fin, res) {
  const sql = 'SELECT DATE(fechaConteo) as fecha, COUNT(*) as totalDia FROM Conteo WHERE idContador = ? AND fechaConteo BETWEEN ? AND ? GROUP BY DATE(fechaConteo)';
  try {
    const result = await queryDB(sql, [idContador, inicio, fin]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener totalDia de datos de conteo:', err);
    res.status(500).send('Error al obtener totalDia de datos de conteo');
  }
}

async function obtenerUltimoDatoTemperatura(idSensor, res) {
  const sql = 'SELECT valorTemperatura FROM Temperatura WHERE idSensor = ? ORDER BY fechaTemperatura DESC LIMIT 1';
  try {
    const result = await queryDB(sql, [idSensor]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener último dato de temperatura:', err);
    res.status(500).send('Error al obtener último dato de temperatura');
  }
}

async function obtenerTotalDatosConteoHoy(idContador, res) {
  const sql = 'SELECT COUNT(*) as total FROM Conteo WHERE idContador = ? AND DATE(fechaConteo) = CURDATE()';
  try {
    const result = await queryDB(sql, [idContador]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener total de datos de conteo hoy:', err);
    res.status(500).send('Error al obtener total de datos de conteo hoy');
  }
}

app.listen(4201, () => {
  console.log('Servidor iniciado en http://localhost:4201');
});
