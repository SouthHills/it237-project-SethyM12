import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBuildView } from './employee-build-view';

describe('EmployeeBuildView', () => {
  let component: EmployeeBuildView;
  let fixture: ComponentFixture<EmployeeBuildView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeBuildView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBuildView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
