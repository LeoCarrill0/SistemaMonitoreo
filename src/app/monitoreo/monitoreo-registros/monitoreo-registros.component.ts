import { Component } from '@angular/core';
import { MonitoreoService } from './../monitoreo.service'
import { Router } from '@angular/router';
import { MonitoreoRegistrosService } from './monitoreo-registros.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagesComponent } from './../../pages/pages.component'
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-monitoreo-registros',
  templateUrl: './monitoreo-registros.component.html',
  styleUrls: ['./monitoreo-registros.component.scss']
})

export class MonitoreoRegistrosComponent {
  formulario: FormGroup;
  chart: any;
  chartTemp: any;
  ctx: any;
  ctxTemp: any;
  x: any;
  y: any;
  AlertSearch: string = '';
  url: string = ''

  constructor(public authService: MonitoreoService, private router: Router, private api: MonitoreoRegistrosService, private fb: FormBuilder, public desactivarBtn: PagesComponent) {
    this.formulario = this.fb.group({
      fechaInicio: [''],
      fechaFin: ['']
    });
  }

  ngOnInit() {
    const authFlag = this.authService.isAuthenticatedUser();
    if (!authFlag) {
      this.url = 'dashboard/monitoreo/temperaturas';
      this.router.navigateByUrl('dashboard/monitoreo/login');
    }

    this.ctxTemp = document.getElementById('Tempctx') as HTMLCanvasElement;
    this.chartTemp = new Chart(this.ctxTemp, {
      type: 'line',
      data: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        datasets: [
          {
            label: 'Temperatura 1',
            data: [10, 20, 30, 40, 50, 60],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Temperatura 2',
            data: [15, 25, 35, 45, 55, 65],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            max: 100, // Ajusta este valor según tus necesidades
            min: 0,   // Ajusta este valor según tus necesidades
            grace: '100%',
            ticks: {
              stepSize: 100, // Ajusta este valor según tus necesidades
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  DatosTemperatura() {
    let promise = this.api.obtenerDatosTemperatura(1, '2023-10-01', '2023-11-07');
    promise.then(valor => {
      console.log(valor)
    });
  }
}
