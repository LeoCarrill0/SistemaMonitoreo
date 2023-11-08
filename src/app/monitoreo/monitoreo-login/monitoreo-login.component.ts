import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MonitoreoService } from './../monitoreo.service';
import { MonitoreoLoginService } from './monitoreo-login.service';
import { PagesComponent } from '../../pages/pages.component';

@Component({
  selector: 'app-monitoreo-login',
  templateUrl: './monitoreo-login.component.html',
  styleUrls: ['./monitoreo-login.component.scss']
})
export class MonitoreoLoginComponent {
  constructor(private router: Router, private apiService: MonitoreoLoginService, private AuthLogin: MonitoreoService, private close: PagesComponent) { }
  password: string = '';
  user: string = '';
  AlertUser: string = ''

  login() {
    if (this.password != '' || this.user != '') {
      this.apiService.validarUsuarios(this.user, this.password).subscribe(
        data => {
          this.loginValidacion(data);
        },
        error => {
          this.AlertUser = 'Error al obtener datos de la API:' + error;
          console.log(error);
        }
      );
    } else {
      this.AlertUser = 'Campos vacios';
    }
  }

  loginValidacion(datos: any) {
    const status = datos.status;
    if (status) {
      this.AuthLogin.guardarToken(datos.key);
      this.router.navigateByUrl('dashboard/monitoreo/registros');
      this.AlertUser = '';
      this.close.botonDesactivado = !status;
    } else {
      this.AlertUser = 'Datos incorectos';
      this.close.botonDesactivado = !status;
    }
  }
}
