import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  validarUsuarios(user: string, password: string): Observable<any> {
    const url = `${this.apiUrl}ValidarUsuario?user=${user}&password=${password}`;
    return this.http.get(url);
  }
  obtenerDatosTemperatura() {
    const url = 'http://localhost:3000/obtenerDatos';
    const params = new HttpParams()
      .set('tipo', 'T')
      .set('idSensor', '1')
      .set('inicio', '2023-10-01')
      .set('fin', '2023-10-20');

    this.http.get(url, { params }).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error al obtener datos de temperatura:', error);
      }
    );
  }

  obtenerUltimoDatoTemperatura() {
    const url = 'http://localhost:3000/obtenerDatos';
    const params = new HttpParams().set('tipo', 'Tu').set('idSensor', '1');

    this.http.get(url, { params }).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error al obtener último dato de temperatura:', error);
      }
    );
  }

  obtenerTotalDatosConteo() {
    const url = 'http://localhost:3000/obtenerDatos';
    const params = new HttpParams()
      .set('tipo', 'C')
      .set('idContador', '1')
      .set('inicio', '2023-10-01')
      .set('fin', '2023-10-20');

    this.http.get(url, { params }).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error al obtener total de datos de conteo:', error);
      }
    );
  }

  obtenerTotalDatosConteoHoy() {
    const url = 'http://localhost:3000/obtenerDatos';
    const params = new HttpParams().set('tipo', 'Cu').set('idContador', '1');

    this.http.get(url, { params }).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error al obtener total de datos de conteo hoy:', error);
      }
    );
  }
}
