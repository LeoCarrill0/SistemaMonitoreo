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

  constructor(public authService: MonitoreoService, private router: Router, private api: MonitoreoRegistrosService, private fb: FormBuilder, public desactivarBtn: PagesComponent) {
    this.formulario = this.fb.group({
      fechaInicio: [''],
      fechaFin: ['']
    });
  }

  grapic(x: String[], y: number[]) {
    if (typeof this.chart === 'object') {
      this.chart.destroy()
    }
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: x,
        datasets: [{
          label: 'Contador 1',
          data: y,
          backgroundColor: [
            'rgba(255, 99, 132, 0.1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          barThickness: 10
        },
        {
          label: 'Contador 2',
          data: [1, 5, 7, 4, 5, 6],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          //barPercentage: 0.4 // Ajusta este valor para controlar el ancho de las barras
          barThickness: 10
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
            max: 10, // Ajusta este valor según tus necesidades
            min: 0,   // Ajusta este valor según tus necesidades
            beginAtZero: true
          }
        }
      }
    });
  }

  ngOnInit() {
    const authFlag = this.authService.isAuthenticatedUser();
    if (!authFlag) {
      this.router.navigateByUrl('dashboard/monitoreo/login');
    }
    this.ctx = document.getElementById('ctx') as HTMLCanvasElement;
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [0],
        datasets: [{
          label: 'Contador 1',
          data: [0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          barThickness: 10
        },
        {
          label: 'Contador 2',
          data: [0],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          //barPercentage: 0.4 // Ajusta este valor para controlar el ancho de las barras
          barThickness: 10
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
            max: 10, // Ajusta este valor según tus necesidades
            min: 0,   // Ajusta este valor según tus necesidades
            beginAtZero: true
          }
        }
      }
    });

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

  DatosConteo() {
    if (this.formulario.value.fechaInicio != "" && this.formulario.value.fechaFin != "") {
      if (this.formulario.value.fechaInicio == this.formulario.value.fechaFin || this.formulario.value.fechaInicio < this.formulario.value.fechaFin) {
        let promise = this.api.obtenerTotalDatosConteo(1, this.formulario.value.fechaInicio, this.formulario.value.fechaFin);
        promise.then(valor => {
          this.printtemp(valor)
        })
        this.AlertSearch = "";
      } else {
        this.AlertSearch = "La fecha de inicio no puede ser menor que la fecha final";
      }
    } else {
      this.AlertSearch = "Ingrese las dos fechas";
    }
  }

  DatosTemperatura() {
    let promise = this.api.obtenerDatosTemperatura(1, '2023-10-01', '2023-11-07');
    promise.then(valor => {
      console.log(valor)
    });

  }

  printtemp(valor: any) {
    let array = valor
    this.x = [];
    this.y = [];
    for (let i = 0; i < array.length; i++) {
      let objeto = array[i];
      const fecha = new Date(objeto.fecha);
      const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
      const fechaFormateada = fecha.toLocaleDateString('es-ES');
      this.x[i] = fechaFormateada;
      this.y[i] = objeto.totalDia;
    }
    if (this.x) {
      this.grapic(this.x, this.y);
    }
  }
}
