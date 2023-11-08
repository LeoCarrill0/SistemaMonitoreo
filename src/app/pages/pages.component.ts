import { Component } from '@angular/core';
import {MonitoreoService} from './../monitoreo/monitoreo.service'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  constructor(public cerrarsession: MonitoreoService){}
  public botonDesactivado = !this.cerrarsession.isAuthenticatedUser() // Inicialmente desactivado

  close(){
    this.botonDesactivado = true;
    this.cerrarsession.cerrarSesion();
  }
}
