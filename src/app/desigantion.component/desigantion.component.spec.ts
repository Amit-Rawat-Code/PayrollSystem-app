import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesigantionComponent } from './desigantion.component';

describe('DesigantionComponent', () => {
  let component: DesigantionComponent;
  let fixture: ComponentFixture<DesigantionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesigantionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesigantionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
