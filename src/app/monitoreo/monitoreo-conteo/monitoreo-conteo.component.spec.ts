import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoConteoComponent } from './monitoreo-conteo.component';

describe('MonitoreoConteoComponent', () => {
  let component: MonitoreoConteoComponent;
  let fixture: ComponentFixture<MonitoreoConteoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoreoConteoComponent]
    });
    fixture = TestBed.createComponent(MonitoreoConteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
