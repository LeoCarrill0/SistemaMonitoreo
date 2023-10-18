import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MonitoreoService } from '../monitoreo.service';

@Component({
  selector: 'app-monitoreo-login',
  templateUrl: './monitoreo-login.component.html',
  styleUrls: ['./monitoreo-login.component.scss']
})
export class MonitoreoLoginComponent {
  constructor(private router: Router, private apiService: MonitoreoService) { }
  password: string = '';
  user: string = '';
  AlertUser: string = ''

  login() {
    if (this.password != '' || this.user != '') {
      this.apiService.getDatos(this.user, this.password).subscribe(
        data => {
          this.loginValidacion(data);
        },
        error => {
          this.AlertUser = 'Error al obtener datos de la API:' + error;
        }
      );
    } else {
      this.AlertUser = 'Campos vacios';
    }
  }

  loginValidacion(datos: any) {
    const status = datos.status;
    if (status) {
      this.router.navigateByUrl('/dashboard/monitoreo/registros');
      this.AlertUser = '';
    } else {
      this.AlertUser = 'Datos incorectos';
    }
    //this.password = btoa(this.password); //encriptar
    //this.password = atob(this.password); //desencriptar
  }
}
