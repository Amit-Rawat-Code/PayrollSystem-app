import { TestBed } from '@angular/core/testing';

import { EmployeeBankDetailServices } from './employee-bank-detail-services';

describe('EmployeeBankDetailServices', () => {
  let service: EmployeeBankDetailServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBankDetailServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
