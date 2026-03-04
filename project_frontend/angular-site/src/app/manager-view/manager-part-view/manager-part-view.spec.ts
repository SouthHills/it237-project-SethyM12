import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPartView } from './manager-part-view';

describe('ManagerPartView', () => {
  let component: ManagerPartView;
  let fixture: ComponentFixture<ManagerPartView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerPartView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerPartView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
