import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRfComponent } from './employee-rf-component';

describe('EmployeeRfComponent', () => {
  let component: EmployeeRfComponent;
  let fixture: ComponentFixture<EmployeeRfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeRfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRfComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
