import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {
  private apiUrl = 'http://localhost:3000/datos';

  constructor(private http: HttpClient) {}

  getDatos(user: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?user=${user}&password=${password}`;
    return this.http.get(url);
  }
}
