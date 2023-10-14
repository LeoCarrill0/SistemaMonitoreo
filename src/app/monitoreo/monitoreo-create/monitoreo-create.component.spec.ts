import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoCreateComponent } from './monitoreo-create.component';

describe('MonitoreoCreateComponent', () => {
  let component: MonitoreoCreateComponent;
  let fixture: ComponentFixture<MonitoreoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoreoCreateComponent]
    });
    fixture = TestBed.createComponent(MonitoreoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
