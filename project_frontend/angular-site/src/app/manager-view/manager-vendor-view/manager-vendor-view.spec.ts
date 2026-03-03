import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerVendorView } from './manager-vendor-view';

describe('ManagerVendorView', () => {
  let component: ManagerVendorView;
  let fixture: ComponentFixture<ManagerVendorView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerVendorView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerVendorView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
