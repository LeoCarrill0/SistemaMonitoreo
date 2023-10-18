import requests #pip install requests --break-system-packages

# URL de la API donde quieres enviar los datos
url = 'http://localhost:3000/insertar-temperatura'

# Datos que quieres enviar en la solicitud POST
data = {
    'valorTemperatura': 25.5,
    'idSensor': 1
}

# Realiza la solicitud POST
response = requests.post(url, json=data)

# Verifica la respuesta
if response.status_code == 200:
    print("Datos de temperatura insertados correctamente")
else:
    print(f"Error al insertar datos de temperatura. Código de estado: {response.status_code}")


url = 'http://localhost:3000/insertar-conteo'

data = {
    'idContador': 1
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print("Dato de conteo insertado correctamente")
else:
    print(f"Error al insertar dato de conteo. Código de estado: {response.status_code}")
