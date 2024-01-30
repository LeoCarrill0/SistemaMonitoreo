import { Component } from '@angular/core';
import { MonitoreoService } from '../monitoreo.service';
import { Injectable, NgZone } from '@angular/core';
import { MonitoreoCreateService } from './monitoreo-create.service';
import { PagesComponent } from '../../pages/pages.component';

@Component({
  selector: 'app-monitoreo-create',
  templateUrl: './monitoreo-create.component.html',
  styleUrls: ['./monitoreo-create.component.scss']
})

export class MonitoreoCreateComponent {
  constructor(private ApiService: MonitoreoCreateService, public cerrarsession: MonitoreoService) {

    this.ApiService.GetAvApi(1).subscribe(
      data => {
        if(data.value){
          this.ganancia1=data.value;
        }
      },
      error => {
        this.AlertAv = 'Error al obtener datos de la API:' + error;
        console.log(error);
      }
    );

    this.ApiService.GetAvApi(2).subscribe(
      data => {
        if(data.value){
          this.ganancia2=data.value;
        }
      },
      error => {
        this.AlertAv = 'Error al obtener datos de la API:' + error;
        console.log(error);
      }
    );

    setInterval(() => {
      this.ApiService.obtenerTotalDatosConteoHoy(1).then(valor => {
        this.Contador1 = valor
      })
        .catch(error => {
          console.error('Error al obtener el conteo 1:', error);
        });

      this.ApiService.obtenerTotalDatosConteoHoy(2).then(valor => {
        this.Contador2 = valor
      })
        .catch(error => {
          console.error('Error al obtener el conteo 2:', error);
        });

      this.ApiService.obtenerUltimoDatoTemperatura(1).then(valor => {
        this.actualizarValor1(valor);
      })
        .catch(error => {
          console.error('Error al obtener el valor de temperatura 1:', error);
        });

      this.ApiService.obtenerUltimoDatoTemperatura(2).then(valor => {
        this.actualizarValor2(valor);
      })
        .catch(error => {
          console.error('Error al obtener el valor de temperatura 2:', error);
        });
    }, 100);
  }
  
  ganancia1: string = '';
  ganancia2: string = '';
  Contador1: any;
  Contador2: any;
  AlertAv: string = '';

  actualizarValor1(valor1: number): void {
    const valor1Element = document.getElementById('valor1');

    if (valor1Element) {
      valor1Element.textContent = `${valor1}°`;

      const stickElement = document.getElementById('stick');

      if (stickElement) {
        const rotation = -135 + (valor1 / 100) * 100;
        stickElement.style.transform = `rotate(${rotation}deg)`;
      }
    }
  }

  actualizarValor2(valor2: number): void {
    const valor2Element = document.getElementById('valor2');

    if (valor2Element) {
      valor2Element.textContent = `${valor2}°`;

      const stickElement2 = document.getElementById('stick2');
      if (stickElement2) {
        const rotation = -135 + (valor2 / 100) * 100;
        stickElement2.style.transform = `rotate(${rotation}deg)`;
      }
    }
  }

  public botonDesactivado = !this.cerrarsession.isAuthenticatedUser() // Inicialmente desactivado

  SetAv(nSens:number) {
    if(nSens==1){
      if(this.ganancia1 != '' ){
        //const valueUp = this.ApiService.SetAvApi();
        this.ApiService.SetAvApi(this.ganancia1, nSens).subscribe(
          data => {
            if(!data.status){
              this.ganancia1='';
            }
            this.AlertAv = '';
          },
          error => {
            this.AlertAv = 'Error al Setear datos de la API:' + error;
            console.log(error);
          }
        );
      }else{
        this.AlertAv = 'Campo vacio favor de asignar el valor'
      }
    }else if(nSens==2){
      if(this.ganancia2 != '' ){
        this.ApiService.SetAvApi(this.ganancia2, nSens).subscribe(
          data => {
            if(!data.status){
              this.ganancia2='';
            }
            this.AlertAv = '';
          },
          error => {
            this.AlertAv = 'Error al Setear datos de la API:' + error;
            console.log(error);
          }
        );
      }else{
        this.AlertAv = 'Campo vacio favor de asignar el valor'
      }
    }
    
  }
}
