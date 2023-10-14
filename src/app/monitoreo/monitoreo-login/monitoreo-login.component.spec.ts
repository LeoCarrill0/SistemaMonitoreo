import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoLoginComponent } from './monitoreo-login.component';

describe('MonitoreoLoginComponent', () => {
  let component: MonitoreoLoginComponent;
  let fixture: ComponentFixture<MonitoreoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoreoLoginComponent]
    });
    fixture = TestBed.createComponent(MonitoreoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
