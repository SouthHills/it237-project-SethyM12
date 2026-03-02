import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUserView } from './manager-user-view';

describe('ManagerUserView', () => {
  let component: ManagerUserView;
  let fixture: ComponentFixture<ManagerUserView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerUserView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerUserView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
