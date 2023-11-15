import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoreoCreateComponent } from './monitoreo-create/monitoreo-create.component';
import { MonitoreoLoginComponent } from './monitoreo-login/monitoreo-login.component';
import { MonitoreoRegistrosComponent } from './monitoreo-registros/monitoreo-registros.component';
import { MonitoreoConteoComponent } from './monitoreo-conteo/monitoreo-conteo.component';

const routes: Routes = [
  {path: 'inicio', component: MonitoreoCreateComponent},
  {path: 'login', component: MonitoreoLoginComponent},
  {path: 'temperaturas', component: MonitoreoRegistrosComponent},
  {path: 'contadores', component: MonitoreoConteoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MonitoreoRoutingModule { }
