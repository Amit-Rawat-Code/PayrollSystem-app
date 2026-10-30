import { TestBed } from '@angular/core/testing';

import { EmployeeOfficialDetailServices } from './employee-official-detail-services';

describe('EmployeeOfficialDetailServices', () => {
  let service: EmployeeOfficialDetailServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeOfficialDetailServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
