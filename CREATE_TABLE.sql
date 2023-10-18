CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    user VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Crear la tabla Sensor
CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nombreSensor VARCHAR(255) NOT NULL,
    descripcionSensor VARCHAR(255)
);

-- Crear la tabla Temperatura
CREATE TABLE Temperatura (
    IdTemperatura INT PRIMARY KEY AUTO_INCREMENT,
    valorTemperatura DECIMAL(5,2) NOT NULL,
    idSensor INT,
    fechaTemperatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idSensor) REFERENCES Sensor(idSensor)
);

-- Crear la tabla Contador
CREATE TABLE Contador (
    idContador INT PRIMARY KEY AUTO_INCREMENT,
    nombreContador VARCHAR(255) NOT NULL,
    descripcionContador VARCHAR(255)
);

-- Crear la tabla Conteo
CREATE TABLE Conteo (
    IdConteo INT PRIMARY KEY AUTO_INCREMENT,
    idContador INT,
    fechaConteo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idContador) REFERENCES Contador(idContador)
);
