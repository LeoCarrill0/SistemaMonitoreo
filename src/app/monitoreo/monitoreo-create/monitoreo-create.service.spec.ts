import { TestBed } from '@angular/core/testing';

import { MonitoreoCreateService } from './monitoreo-create.service';

describe('MonitoreoCreateService', () => {
  let service: MonitoreoCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoreoCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
