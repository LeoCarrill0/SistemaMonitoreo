import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoLoginService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  validarUsuarios(user: string, password: string): Observable<any> {
    const url = `${this.apiUrl}ValidarUsuario?user=${user}&password=${password}`;
    return this.http.get(url);
  }
}
