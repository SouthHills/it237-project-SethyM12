import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePartView } from './employee-part-view';

describe('EmployeePartView', () => {
  let component: EmployeePartView;
  let fixture: ComponentFixture<EmployeePartView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePartView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePartView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
