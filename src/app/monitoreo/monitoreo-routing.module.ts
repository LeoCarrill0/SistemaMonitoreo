import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoreoCreateComponent } from './monitoreo-create/monitoreo-create.component';
import { MonitoreoLoginComponent } from './monitoreo-login/monitoreo-login.component';
import { MonitoreoRegistrosComponent } from './monitoreo-registros/monitoreo-registros.component';

const routes: Routes = [
  {path: 'inicio', component: MonitoreoCreateComponent},
  {path: 'login', component: MonitoreoLoginComponent},
  {path: 'registros', component: MonitoreoRegistrosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MonitoreoRoutingModule { }
