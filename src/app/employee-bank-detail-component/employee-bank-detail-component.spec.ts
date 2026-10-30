import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBankDetailComponent } from './employee-bank-detail-component';

describe('EmployeeBankDetailComponent', () => {
  let component: EmployeeBankDetailComponent;
  let fixture: ComponentFixture<EmployeeBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBankDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBankDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
