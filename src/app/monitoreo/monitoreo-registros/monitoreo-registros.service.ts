import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonitoreoService } from '../monitoreo.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoRegistrosService {
  constructor(private http: HttpClient, private ApiUrl:MonitoreoService) { }

  private apiUrl = this.ApiUrl.apiUrl;


  async obtenerDatosTemperatura(idSensor: number, inicio: string, fin: string): Promise<any> {
    const url = `${this.apiUrl}obtenerDatos?tipo=T&idSensor=${idSensor}&inicio=${inicio}&fin=${fin}`;
    const response = await this.http.get(url).toPromise();
    return response;
  }

  async obtenerTotalDatosConteo(idContador: number, inicio: string, fin: string): Promise<any> {
    const url = `${this.apiUrl}obtenerDatos?tipo=C&idContador=${idContador}&inicio=${inicio}&fin=${fin}`;
    const response = await this.http.get(url).toPromise();
    return response;
  }
}
