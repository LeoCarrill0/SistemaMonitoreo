import requests  # pip install requests --break-system-packages


def setTemperatura():
    # URL de la API donde quieres enviar los datos
    url = "http://localhost:3000/insertTemperatura"

    # Datos que quieres enviar en la solicitud POST
    data = {"valorTemperatura": 25.5, "idSensor": 1}

    # Realiza la solicitud POST
    response = requests.post(url, json=data)

    # Verifica la respuesta
    if response.status_code == 200:
        print("Datos de temperatura insertados correctamente")
    else:
        print(
            f"Error al insertar datos de temperatura. Código de estado: {response.status_code}"
        )


def setConteo():
    url = "http://localhost:3000/insertConteo"

    data = {"idContador": 1}

    response = requests.post(url, json=data)

    if response.status_code == 200:
        print("Dato de conteo insertado correctamente")
    else:
        print(
            f"Error al insertar dato de conteo. Código de estado: {response.status_code}"
        )


def insertUsuario():
    url = "http://localhost:3000/insertUsuario"

    data = {
        "user": "SIS",
        "password": "2222",
        "prioridadUsuario": 1
    }

    response = requests.post(url, json=data)

    if response.status_code == 200:
        print("Usuario insertado correctamente")
    else:
        print(f"Error al insertar usuario. Código de estado: {response.status_code}")

def ObtenerDtos():
  url = 'http://localhost:3000/obtenerDatos'
  params = {
      'tipo': 'Tu',
      'idSensor': 1,
      'inicio': '2023-10-01',
      'fin': '2023-10-20'
  }

  response = requests.get(url, params=params)

  if response.status_code == 200:
      data = response.json()
      print(data)
  else:
      print(f"Error al obtener datos de temperatura. Código de estado: {response.status_code}")

ObtenerDtos()
