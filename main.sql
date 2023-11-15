SELECT IdTemperatura, valorTemperatura, idSensor, fechaTemperatura FROM temperatura WHERE idSensor = 1 AND fechaTemperatura BETWEEN '2023-10-01' AND '2023-11-06 23:59:59'

SELECT
  DATE(fechaConteo) as fecha,
  COUNT(*) as cantidadDatosPorDia
FROM
  conteo
  WHERE idContador = 1 AND fechaConteo BETWEEN '2023-10-01' AND '2023-11-06 23:59:59'
GROUP BY
  DATE(fechaConteo)
