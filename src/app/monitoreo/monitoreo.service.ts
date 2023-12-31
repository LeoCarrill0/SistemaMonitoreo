import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {
  constructor(private router: Router) {}
  private tokenKey = 'Monitoreo123Pollos'; // Define un nombre para tu clave de token
  public apiUrl='http://localhost:4201/';
  // Método para establecer el estado de autenticación

  guardarToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token desde el almacenamiento local
  obtenerToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticatedUser(): boolean {
    const token = this.obtenerToken();
    if(token){
      return this.verificarExpiracionToken(token);
    }
    return false;
  }

  verificarExpiracionToken(token: string): boolean {
    const decodedToken = jwtDecode(token);
    if (decodedToken && decodedToken.exp !== undefined) {
      const expDate = new Date(0);
      expDate.setUTCSeconds(decodedToken.exp);
      let Exptoken = expDate > new Date();
      return Exptoken
    }
    return false; // O podrías redirigir al usuario a la página de inicio de sesión
  }

  public cerrarSesion() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('dashboard/monitoreo/inicio');
  }
}
