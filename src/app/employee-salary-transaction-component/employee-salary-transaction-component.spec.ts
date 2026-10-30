import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryTransactionComponent } from './employee-salary-transaction-component';

describe('EmployeeSalaryTransactionComponent', () => {
  let component: EmployeeSalaryTransactionComponent;
  let fixture: ComponentFixture<EmployeeSalaryTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSalaryTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSalaryTransactionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
