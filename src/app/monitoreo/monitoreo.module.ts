import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoreoLoginComponent } from './monitoreo-login/monitoreo-login.component';
import { MonitoreoCreateComponent } from './monitoreo-create/monitoreo-create.component';
import { MonitoreoRoutingModule } from './monitoreo-routing.module';



@NgModule({
  declarations: [
    MonitoreoLoginComponent,
    MonitoreoCreateComponent
  ],
  imports: [
    CommonModule,
    MonitoreoRoutingModule
  ]
})
export class MonitoreoModule { }
