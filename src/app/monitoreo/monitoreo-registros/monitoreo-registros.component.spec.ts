import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoRegistrosComponent } from './monitoreo-registros.component';

describe('MonitoreoRegistrosComponent', () => {
  let component: MonitoreoRegistrosComponent;
  let fixture: ComponentFixture<MonitoreoRegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoreoRegistrosComponent]
    });
    fixture = TestBed.createComponent(MonitoreoRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
