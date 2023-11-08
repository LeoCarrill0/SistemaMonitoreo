import { TestBed } from '@angular/core/testing';

import { MonitoreoRegistrosService } from './monitoreo-registros.service';

describe('MonitoreoRegistrosService', () => {
  let service: MonitoreoRegistrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoreoRegistrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
