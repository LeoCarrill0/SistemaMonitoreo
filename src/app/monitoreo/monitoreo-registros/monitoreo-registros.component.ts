import { Component } from '@angular/core';
import { MonitoreoService } from './../monitoreo.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitoreo-registros',
  templateUrl: './monitoreo-registros.component.html',
  styleUrls: ['./monitoreo-registros.component.scss']
})
export class MonitoreoRegistrosComponent {
  constructor(public authService: MonitoreoService, private router: Router) {}

  ngOnInit() {
    const authFlag = this.authService.isAuthenticatedUser();
    if (!authFlag) {
      this.router.navigateByUrl('dashboard/monitoreo/login');
    }
  }
}
