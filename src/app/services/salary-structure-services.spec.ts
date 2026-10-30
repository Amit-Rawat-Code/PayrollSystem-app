import { TestBed } from '@angular/core/testing';

import { SalaryStructureServices } from './salary-structure-services';

describe('SalaryStructureServices', () => {
  let service: SalaryStructureServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryStructureServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
