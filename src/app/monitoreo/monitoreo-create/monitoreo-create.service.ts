import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoCreateService {


  Temp1: any;
  Contador: any;
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  async obtenerDatosTemperatura(idSensor: number, inicio: string, fin: string): Promise<any> {
    const url = `${this.apiUrl}obtenerDatos?tipo=T&idSensor=${idSensor}&inicio=${inicio}&fin=${fin}`;
    const response = await this.http.get(url).toPromise();
    return response;
  }

  async obtenerUltimoDatoTemperatura(idSensor: number): Promise<number> {
    const url = `${this.apiUrl}obtenerDatos?tipo=Tu&idSensor=${idSensor}`;
    this.Temp1 = await this.http.get(url).toPromise();
    return this.Temp1[0].valorTemperatura;
  }

  async obtenerTotalDatosConteo(idContador: number, inicio: string, fin: string): Promise<any> {
    const url = `${this.apiUrl}obtenerDatos?tipo=C&idContador=${idContador}&inicio=${inicio}&fin=${fin}`;
    const response = await this.http.get(url).toPromise();
    return response;
  }

  async obtenerTotalDatosConteoHoy(idContador: number): Promise<number> {
    const url = `${this.apiUrl}obtenerDatos?tipo=Cu&idContador=${idContador}`;
    this.Contador = await this.http.get(url).toPromise();
    return this.Contador[0].total;
  }
}
