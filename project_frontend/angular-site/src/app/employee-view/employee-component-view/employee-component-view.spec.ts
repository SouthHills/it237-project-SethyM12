import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponentView } from './employee-component-view';

describe('EmployeeComponentView', () => {
  let component: EmployeeComponentView;
  let fixture: ComponentFixture<EmployeeComponentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponentView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeComponentView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
