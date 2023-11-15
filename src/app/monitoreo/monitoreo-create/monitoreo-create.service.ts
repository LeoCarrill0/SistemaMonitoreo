import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoCreateService {

  Temp1: any;
  Contador: any;
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  async obtenerUltimoDatoTemperatura(idSensor: number): Promise<number> {
    const url = `${this.apiUrl}obtenerDatos?tipo=Tu&idSensor=${idSensor}`;
    this.Temp1 = await this.http.get(url).toPromise();
    return this.Temp1[0].valorTemperatura;
  }

  async obtenerTotalDatosConteoHoy(idContador: number): Promise<number> {
    const url = `${this.apiUrl}obtenerDatos?tipo=Cu&idContador=${idContador}`;
    this.Contador = await this.http.get(url).toPromise();
    return this.Contador[0].total;
  }
}
