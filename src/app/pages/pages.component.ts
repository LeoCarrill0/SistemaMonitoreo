import { Component } from '@angular/core';
import { MonitoreoService } from './../monitoreo/monitoreo.service'

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router';

export interface Nodo {
  nombre: string;
  url?: string;
  hijos?: Nodo[];
}

interface NodoPlano {
  expandable: boolean;
  nombre: string;
  url?: string;
  nivel: number;
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  url: string = '';

  arbolData: Nodo[] = [
    {
      nombre: 'Registros',
      hijos: [
        {
          nombre: 'Ajustar datos',
          url: 'dashboard/monitoreo/login'
        },
        {
          nombre: 'Temperaturas',
          url: 'dashboard/monitoreo/temperaturas'
        },
        {
          nombre: 'Contadores',
          url: 'dashboard/monitoreo/contadores'
        }
      ]
    }]/* ... tu estructura de datos del árbol ... */;

  treeControl = new FlatTreeControl<NodoPlano>(
    (node) => node.nivel,
    (node) => node.expandable
  );

  private transformarDatos = (nodo: Nodo, nivel: number) => {
    const nodoPlano: NodoPlano = {
      expandable: !!nodo.hijos && nodo.hijos.length > 0,
      nombre: nodo.nombre,
      url: nodo.url,
      nivel: nivel,
    };
    return nodoPlano;
  };

  treeFlattener = new MatTreeFlattener<Nodo, NodoPlano>(
    this.transformarDatos,
    (node) => node.nivel,
    (node) => node.expandable,
    (node) => node.hijos,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public cerrarsession: MonitoreoService, private router: Router) {
    //this.dataSource.data = this.arbolData.map((item) => this.transformarDatos(item, 0));

    this.dataSource.data = this.arbolData;
  }

  nodosExpandidos: Nodo[] = [];

  expandir(nodo: NodoPlano): void {

    const index = this.treeControl.dataNodes.indexOf(nodo);

    if (!this.treeControl.isExpanded(nodo)) {
      this.treeControl.expand(this.treeControl.dataNodes[index]);
      this.nodosExpandidos.push(nodo);
    } else {
      this.treeControl.collapse(this.treeControl.dataNodes[index]);
      this.nodosExpandidos = this.nodosExpandidos.filter((n) => n !== nodo);
    }

    if (nodo.url && nodo.url.trim() !== '') {
      this.router.navigate([nodo.url]);
      this.url = nodo.url;
    }
  }

  public botonDesactivado = !this.cerrarsession.isAuthenticatedUser() // Inicialmente desactivado

  close() {
    this.botonDesactivado = true;
    this.cerrarsession.cerrarSesion();
  }

  tieneHijos = (_: number, nodo: NodoPlano) => nodo.expandable;
}
