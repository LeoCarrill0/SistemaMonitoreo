import { Component } from '@angular/core';

@Component({
  selector: 'app-monitoreo-create',
  templateUrl: './monitoreo-create.component.html',
  styleUrls: ['./monitoreo-create.component.scss']
})
export class MonitoreoCreateComponent {

}

function actualizarValores(valor1: number, valor2: number): void {
  const valor1Element = document.getElementById('valor1');
  const valor2Element = document.getElementById('valor2');

  if (valor1Element && valor2Element) {
    valor1Element.textContent = `${valor1}°`;
    valor2Element.textContent = `${valor2}°`;

    const stickElement = document.getElementById('stick');

    if (stickElement) {
      const rotation = -50 + (valor1 / 100) * 100;
      stickElement.style.transform = `rotate(${rotation}deg)`;
    }
  }
}

setInterval(function() {
  const valor1 = Math.floor(Math.random() * 101);
  const valor2 = Math.floor(Math.random() * 101);
  actualizarValores(valor1, valor2);
}, 1000);
