import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVendorView } from './employee-vendor-view';

describe('EmployeeVendorView', () => {
  let component: EmployeeVendorView;
  let fixture: ComponentFixture<EmployeeVendorView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeVendorView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeVendorView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
