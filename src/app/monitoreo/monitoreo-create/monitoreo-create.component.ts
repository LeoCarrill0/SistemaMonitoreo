import { Component } from '@angular/core';
import { MonitoreoService } from '../monitoreo.service';

@Component({
  selector: 'app-monitoreo-create',
  templateUrl: './monitoreo-create.component.html',
  styleUrls: ['./monitoreo-create.component.scss']
})
export class MonitoreoCreateComponent {
  constructor(private ApiService: MonitoreoService){}
  Contador1: number = 0;
  Contador2: number = 0;
}

function actualizarValores(valor1: number, valor2: number): void {
  const valor1Element = document.getElementById('valor1');
  const valor2Element = document.getElementById('valor2');


  if (valor1Element && valor2Element) {
    valor1Element.textContent = `${valor1}°`;
    valor2Element.textContent = `${valor2}°`;

    const stickElement = document.getElementById('stick');
    const stickElement2 = document.getElementById('stick2');

    if (stickElement) {
      const rotation = -50 + (valor1 / 100) * 100;
      stickElement.style.transform = `rotate(${rotation}deg)`;
    }

    if (stickElement2) {
      const rotation = -50 + (valor2 / 100) * 100;
      stickElement2.style.transform = `rotate(${rotation}deg)`;
    }
  }
}


