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
  x2: any;
  y2: any;
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

    this.ctxTemp = document.getElementById('ctxTemp-2') as HTMLCanvasElement;
    this.chartTemp = new Chart(this.ctxTemp, {
      type: 'line',
      data: {
        labels: [0],
        datasets: [
          {
            label: 'Temperatura 2',
            data: [0],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            max: 10, // Ajusta este valor según tus necesidades
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

    this.ctx = document.getElementById('ctxTemp-1') as HTMLCanvasElement;
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [0],
        datasets: [{
          label: 'Temperatura 1',
          data: [0],
          backgroundColor: [
            'rgba(54, 162, 235, 0.1)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            max: 10, // Ajusta este valor según tus necesidades
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

  DatosTemperatura() {
    if (this.formulario.value.fechaInicio != "" && this.formulario.value.fechaFin != "") {

      if (this.formulario.value.fechaInicio == this.formulario.value.fechaFin || this.formulario.value.fechaInicio < this.formulario.value.fechaFin) {
        let promise = this.api.obtenerDatosTemperatura(1, this.formulario.value.fechaInicio, this.formulario.value.fechaFin);
        promise.then(valor => {
          this.printtemp(valor, 1)
        })
        let promise2 = this.api.obtenerDatosTemperatura(2, this.formulario.value.fechaInicio, this.formulario.value.fechaFin);
        promise2.then(valor => {
          this.printtemp(valor, 2)
        })
        this.AlertSearch = '';
      } else {
        this.AlertSearch = "La fecha de inicio no puede ser menor que la fecha final";
      }
    } else {
      this.AlertSearch = "Ingrese las dos fechas";
    }

  }

  printtemp(valor: any, Ngrap: Number) {
    let array = valor
    this.x = [];
    this.y = [];
    this.x2 = [];
    this.y2 = [];
    for (let i = 0; i < array.length; i++) {
      let objeto = array[i];
      const fecha = new Date(objeto.fechaTemperatura);

      // Restar un día para obtener la fecha deseada
      fecha.setDate(fecha.getDate() - 1);

      // Formatear la fecha
      const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

      if (Ngrap == 1) {
        this.x[i] = fechaFormateada;
        this.y[i] = objeto.valorTemperatura;
      } else if (Ngrap == 2) {
        this.x2[i] = fechaFormateada;
        this.y2[i] = objeto.valorTemperatura;
      }
    }
    if (this.x) {
      if (Ngrap == 1) {
        this.grapic(this.x, this.y);
      } else if (Ngrap == 2) {
        this.grapic2(this.x2, this.y2)
      }
    }
  }

  grapic(x: String[], y: number[]) {
    if (typeof this.chart === 'object') {
      this.chart.destroy()
    }
    const yMax = Math.max(...y) + 5
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          label: 'Temperatura 1',
          data: y,
          backgroundColor: [
            'rgba(255, 99, 132, 0.1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          //barThickness: 10
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
            max: yMax, // Ajusta este valor según tus necesidades
            min: 0,   // Ajusta este valor según tus necesidades
            beginAtZero: true
          }
        }
      }
    });
  }

  grapic2(x: String[], y: number[]) {
    if (typeof this.chartTemp === 'object') {
      this.chartTemp.destroy()
    }
    const yMax = Math.max(...y) + 5
    this.chartTemp = new Chart(this.ctxTemp, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          label: 'Temperatura 2',
          data: y,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)'
          //barThickness: 10
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
            max: yMax, // Ajusta este valor según tus necesidades
            min: 0,   // Ajusta este valor según tus necesidades
            beginAtZero: true
          }
        }
      }
    });
  }
}

