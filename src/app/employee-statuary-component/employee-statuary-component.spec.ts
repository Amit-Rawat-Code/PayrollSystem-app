import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStatuaryComponent } from './employee-statuary-component';

describe('EmployeeStatuaryComponent', () => {
  let component: EmployeeStatuaryComponent;
  let fixture: ComponentFixture<EmployeeStatuaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeStatuaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeStatuaryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
