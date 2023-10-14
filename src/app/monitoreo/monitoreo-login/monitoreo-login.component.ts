import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitoreo-login',
  templateUrl: './monitoreo-login.component.html',
  styleUrls: ['./monitoreo-login.component.scss']
})
export class MonitoreoLoginComponent {
  constructor(private router: Router) { }

  login() {
    this.router.navigateByUrl('/dashboard/monitoreo/inicio');
  }
}
