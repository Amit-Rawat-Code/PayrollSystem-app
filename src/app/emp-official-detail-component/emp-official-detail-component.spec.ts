import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpOfficialDetailComponent } from './emp-official-detail-component';

describe('EmpOfficialDetailComponent', () => {
  let component: EmpOfficialDetailComponent;
  let fixture: ComponentFixture<EmpOfficialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpOfficialDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpOfficialDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
