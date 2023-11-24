import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonitoreoService } from '../monitoreo.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoCreateService {
  constructor(private http: HttpClient, private ApiUrl:MonitoreoService) { }
  
    Temp1: any;
    Contador: any;
    private apiUrl = this.ApiUrl.apiUrl;

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
