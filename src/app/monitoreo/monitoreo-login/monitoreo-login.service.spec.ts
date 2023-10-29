import { TestBed } from '@angular/core/testing';

import { MonitoreoLoginService } from './monitoreo-login.service';

describe('MonitoreoLoginService', () => {
  let service: MonitoreoLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoreoLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
