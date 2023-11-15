import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard/monitoreo/inicio', pathMatch: 'full'},
  { path: 'dashboard', component: PagesComponent,
  children: [
    { path: 'monitoreo',
    loadChildren: () => import('./monitoreo/monitoreo.module').then(m => m.MonitoreoModule)}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
