import { Component } from '@angular/core';
import { MonitoreoService } from '../monitoreo.service';
import { Injectable, NgZone } from '@angular/core';
import { MonitoreoCreateService } from './monitoreo-create.service';

@Component({
  selector: 'app-monitoreo-create',
  templateUrl: './monitoreo-create.component.html',
  styleUrls: ['./monitoreo-create.component.scss']
})

export class MonitoreoCreateComponent {
  constructor(private ApiService: MonitoreoCreateService) {
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

  Contador1: any;
  Contador2: any;

  actualizarValor1(valor1: number): void {
    const valor1Element = document.getElementById('valor1');

    if (valor1Element) {
      valor1Element.textContent = `${valor1}°`;

      const stickElement = document.getElementById('stick');

      if (stickElement) {
        const rotation = -50 + (valor1 / 100) * 100;
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
        const rotation = -50 + (valor2 / 100) * 100;
        stickElement2.style.transform = `rotate(${rotation}deg)`;
      }
    }
  }
}
