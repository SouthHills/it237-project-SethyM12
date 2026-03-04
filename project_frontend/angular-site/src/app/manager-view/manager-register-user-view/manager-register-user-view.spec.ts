import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRegisterUserView } from './manager-register-user-view';

describe('ManagerRegisterUserView', () => {
  let component: ManagerRegisterUserView;
  let fixture: ComponentFixture<ManagerRegisterUserView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRegisterUserView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRegisterUserView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
