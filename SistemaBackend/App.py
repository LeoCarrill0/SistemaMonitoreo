import mysql.connector #pip install mysql-connector-python

from dotenv import load_dotenv #pip install python-dotenv --break-system-packages
import os

# Carga las variables de entorno desde el archivo .env
load_dotenv()

# Conectarse a la base de datos
conexion = mysql.connector.connect(
    host=os.getenv('HOST'),
    user=os.getenv('USER1'),
    password=os.getenv('PASSWORD'),
    database=os.getenv('DATABASE')
)

# Crear un cursor
cursor = conexion.cursor()

# Definir la consulta de inserción
insercion = "INSERT INTO Usuarios (user, password) VALUES (%s, %s)"

# Datos a insertar
datos = [
    ('Leo', 'valor2')
]

# Ejecutar la consulta de inserción en un bucle
for dato in datos:
    cursor.execute(insercion, dato)

# Confirmar los cambios
conexion.commit()

# Cerrar el cursor y la conexión
cursor.close()
conexion.close()
