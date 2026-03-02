import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerComponentView } from './manager-component-view';

describe('ManagerComponentView', () => {
  let component: ManagerComponentView;
  let fixture: ComponentFixture<ManagerComponentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerComponentView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerComponentView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
