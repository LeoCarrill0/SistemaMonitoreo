import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitoreoService } from '../monitoreo.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoLoginService {
  constructor(private http: HttpClient, private ApiUrl:MonitoreoService) { }

  private apiUrl = this.ApiUrl.apiUrl;


  validarUsuarios(user: string, password: string): Observable<any> {
    const url = `${this.apiUrl}ValidarUsuario?user=${user}&password=${password}`;
    return this.http.get(url);
  }
}
