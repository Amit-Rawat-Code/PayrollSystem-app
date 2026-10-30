import { TestBed } from '@angular/core/testing';

import { EmployeeStatuaryServices } from './employee-statuary-services';

describe('EmployeeStatuaryServices', () => {
  let service: EmployeeStatuaryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStatuaryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
