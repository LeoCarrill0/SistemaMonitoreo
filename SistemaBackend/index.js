const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const moment = require('moment');

const i2c = require('i2c-bus');
const { createProgram } = require('typescript');

const Gpio = require('onoff').Gpio;

dotenv.config();

const app = express();

/* API */
app.use(cors({
  //origin: 'http://10.42.0.1:4200',
  // origin: 'http://192.168.1.7:4200',
  // origin: 'http://10.42.0.1',
  // origin: 'http://192.168.0.18:4200',
  // origin: 'http://localhost:4200',
  origin: 'http://192.168.137.56',
}));


app.use(express.json());

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER1,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

db.getConnection((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos...');
  cargarAv();
});

async function cargarAv() {
  const sql = 'Select AvSensor FROM Sensor WHERE idSensor= ?';
  try {
    const result = await queryDB(sql, [1]);
    SenTemp.Av1 = parseFloat(result[0].AvSensor);
    SenTemp.Temp1 = SenTemp.Av1*SenTemp.RealTemp1;
    clearInterval(intervalo1);
    await QuerySQLTemp1();
    intervalo1 = setInterval(QuerySQLTemp1, 5 * 60 * 1000);
  } catch (err) {
    console.log('Error al insertar datos de temperatura ' + err);
  }
  try {
    const result = await queryDB(sql, [2]);
    SenTemp.Av2 = parseFloat(result[0].AvSensor);
    SenTemp.Temp2 = SenTemp.Av2*SenTemp.RealTemp2;
    clearInterval(intervalo2);
    await QuerySQLTemp2();
    intervalo1 = setInterval(QuerySQLTemp2, 5 * 60 * 1000);
  } catch (err) {
    console.log('Error al insertar datos de temperatura ' + err);
  }
}

/* Inicio conexion i2c */
//npm install i2c-busz

const slaveAddress = 0x11;
const busNumber = 1;
const wire = i2c.openSync(busNumber);

var SenTemp = {
  RealTemp1: 0,
  Temp1: 0,
  RealTemp2: 0,
  Temp2: 0,
  redundacia: 2,
  Av1: 0,
  Av2: 0
}

async function QuerySQLTemp1() {
  const sql = 'INSERT INTO Temperatura (valorTemperatura, idSensor) VALUES (?, ?)';

  try {
    await queryDB(sql, [SenTemp.Temp1, 1]);
  } catch (err) {
    console.log('Error al insertar datos de temperatura 1 ' + err);
  }
}

async function QuerySQLTemp2() {
  const sql = 'INSERT INTO Temperatura (valorTemperatura, idSensor) VALUES (?, ?)';

  try {
    await queryDB(sql, [SenTemp.Temp2, 2]);
  } catch (err) {
    console.log('Error al insertar datos de temperatura 2 ' + err);
  }
}

let intervalo1 = setInterval(QuerySQLTemp1, 5 * 60 * 1000);
let intervalo2 = setInterval(QuerySQLTemp2, 5 * 60 * 1000);

function readFromSlave() {
  const nBytes = 8;
  const iBt = 8 - (nBytes - 1);
  const buffer = Buffer.alloc(nBytes);
  wire.readI2cBlockSync(slaveAddress, 0, buffer.length, buffer);

  if (buffer[7] == 8 && buffer[6] == 7 && buffer[5] == 6) {
    if (buffer[0]*SenTemp.Av1 >= (SenTemp.Temp1 + SenTemp.redundacia) || buffer[0]*SenTemp.Av1 <= (SenTemp.Temp1 - SenTemp.redundacia)) {
      SenTemp.RealTemp1 = buffer[0];
      SenTemp.Temp1 = SenTemp.RealTemp1 * SenTemp.Av1;
      clearInterval(intervalo1);
      QuerySQLTemp1();
      intervalo1 = setInterval(QuerySQLTemp1, 5 * 60 * 1000);
    }
    if (buffer[1]*SenTemp.Av2 >= (SenTemp.Temp2 + SenTemp.redundacia) || buffer[1]*SenTemp.Av2 <= (SenTemp.Temp2 - SenTemp.redundacia)) {
      SenTemp.RealTemp2 = buffer[1];
      SenTemp.Temp2 = SenTemp.RealTemp2 * SenTemp.Av2;
      clearInterval(intervalo2);
      QuerySQLTemp2();
      intervalo2 = setInterval(QuerySQLTemp2, 5 * 60 * 1000);
    }
  } else {
    for (i = 0; i < buffer.length; i++) {
      if (i > 1 && buffer[i] == 8) {
        if (buffer[i] == 8 && buffer[i - 1] == 7 && buffer[i - 2] == 6) {
          const bufferT = Buffer.alloc(i + iBt);
          wire.readI2cBlockSync(slaveAddress, 0, bufferT.length, bufferT);
          console.log("Datos erroneos", bufferT)
          break;
        }
      } else if (i == 1 && buffer[i] == 8) {
        if (buffer[i] == 8 && buffer[i - 1] == 7 && buffer[buffer.length - 1] == 6) {
          const bufferT = Buffer.alloc(i + iBt);
          wire.readI2cBlockSync(slaveAddress, 0, bufferT.length, bufferT);
          console.log("Datos erroneos", bufferT)
          break;
        }
      } else if (i == 0 && buffer[i] == 8) {
        if (buffer[i] == 8 && buffer[buffer.length - 1] == 7 && buffer[buffer.length - 2] == 6) {
          const bufferT = Buffer.alloc(i + iBt);
          wire.readI2cBlockSync(slaveAddress, 0, bufferT.length, bufferT);
          console.log("Datos erroneos", bufferT)
          break;
        }
      }
    }
  }
}

const intervalId = setInterval(readFromSlave, 1000);

/* Interupcion GPIO 5*/
//npm install onoff

const sensor_contador1 = new Gpio(5, 'in', 'both');

async function Contador1(err, value) {
  if (err) {
    throw err;
  }

  if (value == 1) {
    const sql = 'INSERT INTO Conteo (idContador) VALUES (?)';
    try {
      await queryDB(sql, [1]);
    } catch (err) {
      console.log('Error al insertar dato de conteo ' + err);
    }
  }
}

sensor_contador1.watch(Contador1);

// Manejador de eventos para capturar señales de interrupción y realizar limpieza
process.on('SIGINT', () => {
  sensor_contador1.unexport(); // Libera el recurso GPIO antes de salir
  process.exit();
});

const sensor_contador2 = new Gpio(6, 'in', 'both');

async function Contador2(err, value) {
  if (err) {
    throw err;
  }

  if (value == 1) {
    const sql = 'INSERT INTO Conteo (idContador) VALUES (?)';
    try {
      await queryDB(sql, [2]);
    } catch (err) {
      console.log('Error al insertar dato de conteo ' + err);
    }
  }
}

sensor_contador2.watch(Contador2);

// Manejador de eventos para capturar señales de interrupción y realizar limpieza
process.on('SIGINT', () => {
  sensor_contador2.unexport(); // Libera el recurso GPIO antes de salir
  process.exit();
});

console.log('Esperando contador...');

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

app.get('/SetAvTemp', async (req, res) => {
  const { valueAv, idSensor } = req.query;
  const sql = 'UPDATE Sensor SET AvSensor= ? WHERE idSensor= ?';
  try {
    const result = await queryDB(sql, [valueAv, idSensor]);
    await cargarAv();
    res.json({ status: result.affectedRows == 1 ? true : false });
  } catch (err) {
    res.status(500).send('Error al insertar datos de temperatura ' + err);
  }
});

app.get('/GetAvTemp', async (req, res) => {
  const { idSensor } = req.query;
  const sql = 'Select AvSensor FROM Sensor WHERE idSensor= ?';
  try {
    const result = await queryDB(sql, [idSensor]);
    await cargarAv();
    res.json({ value: result[0].AvSensor });
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
      
      let fechaInicial = new Date(req.query.inicio);
      fechaInicial.setHours(fechaInicial.getHours() + 6); // Sumar 23 horas
      fechaInicial.setMinutes(fechaInicial.getMinutes() + 0); // Sumar 59 minutos
      fechaInicial.setSeconds(fechaInicial.getSeconds() + 0); // Sumar 59 segundos

      let fechaFin = new Date(req.query.fin);
      fechaFin.setHours(fechaFin.getHours() + 29); // Sumar 23 horas
      fechaFin.setMinutes(fechaFin.getMinutes() + 59); // Sumar 59 minutos
      fechaFin.setSeconds(fechaFin.getSeconds() + 59); // Sumar 59 segundos
      
      let fechaFormateadaInicial = moment(fechaInicial).format('YYYY-MM-DD HH:mm:ss');
      let fechaFormateadaFin = moment(fechaFin).format('YYYY-MM-DD HH:mm:ss');

      const inicio = fechaFormateadaInicial;
      const fin = fechaFormateadaFin;

      await obtenerDatosTemperatura(idSensor, inicio, fin, res);
      break;
    case 'Tu':
      const idSensorUltimo = req.query.idSensor;
      await obtenerUltimoDatoTemperatura(idSensorUltimo, res);
      break;
    case 'C':
      
      let fechaInicialC = new Date(req.query.inicio);
      fechaInicialC.setHours(fechaInicialC.getHours() + 0); // Sumar 23 horas
      fechaInicialC.setMinutes(fechaInicialC.getMinutes() + 0); // Sumar 59 minutos
      fechaInicialC.setSeconds(fechaInicialC.getSeconds() + 0); // Sumar 59 segundos

      let fechaFinC = new Date(req.query.fin);
      fechaFinC.setHours(fechaFinC.getHours() + 23); // Sumar 23 horas
      fechaFinC.setMinutes(fechaFinC.getMinutes() + 59); // Sumar 59 minutos
      fechaFinC.setSeconds(fechaFinC.getSeconds() + 59); // Sumar 59 segundos

      let fechaFormateadaInicialC = moment(fechaInicialC).format('YYYY-MM-DD HH:mm:ss');
      let fechaFormateadaFinC = moment(fechaFinC).format('YYYY-MM-DD HH:mm:ss');

      const idContador = req.query.idContador;
      const inicioC = fechaFormateadaInicialC;
      const finC = fechaFormateadaFinC;

      //console.log(inicioC, finC)
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
  const sql = 'SELECT IdTemperatura, valorTemperatura, idSensor, TIMESTAMP(fechaTemperatura) as fechaTemperatura FROM Temperatura WHERE idSensor = ? AND fechaTemperatura BETWEEN ? AND ?';
  try {
    let result = await queryDB(sql, [idSensor, inicio, fin]);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener datos de temperatura:', err);
    res.status(500).send('Error al obtener datos de temperatura');
  }
}

async function obtenerTotalDatosConteo(idContador, inicio, fin, res) {
  const sql = 'SELECT DATE(fechaConteo) as fecha, COUNT(*) as totalDia FROM Conteo WHERE idContador = ? AND fechaConteo BETWEEN ? AND ? GROUP BY DATE(fechaConteo)';
  try {
    let result = await queryDB(sql, [idContador, inicio, fin]);
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

app.listen(1880, () => {
  console.log('Servidor iniciado en http://localhost:1880');
});
