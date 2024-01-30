#!/bin/bash
# Ruta al directorio del proyecto Angular
ANGULAR_PROYECTO="SistemaMonitoreo"

# Ruta al directorio del proyecto Node.js
cd /home/ia/Documentos/SistemaMonitoreo/SistemaBackend/
# Iniciar el servidor Node.js
node index.js &

# Esperar un poco para asegurarse de que el servidor Node.js está en funcionamiento
#sleep 5

#cd ..
# Iniciar la aplicación Angular
#npm start
