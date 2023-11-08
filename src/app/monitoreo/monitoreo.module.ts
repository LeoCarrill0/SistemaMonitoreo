import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoreoLoginComponent } from './monitoreo-login/monitoreo-login.component';
import { MonitoreoCreateComponent } from './monitoreo-create/monitoreo-create.component';
import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MonitoreoRegistrosComponent } from './monitoreo-registros/monitoreo-registros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    MonitoreoLoginComponent,
    MonitoreoCreateComponent,
    MonitoreoRegistrosComponent,
  ],
  imports: [
    CommonModule,
    MonitoreoRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class MonitoreoModule { }
