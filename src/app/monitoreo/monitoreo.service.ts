import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {

  constructor() { }

  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}
