import { TestBed } from '@angular/core/testing';

import { EmployeeSalaryTransactionServices } from './employee-salary-transaction-services';

describe('EmployeeSalaryTransactionServices', () => {
  let service: EmployeeSalaryTransactionServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSalaryTransactionServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
