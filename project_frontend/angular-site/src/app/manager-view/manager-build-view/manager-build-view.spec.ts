import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBuildView } from './manager-build-view';

describe('ManagerBuildView', () => {
  let component: ManagerBuildView;
  let fixture: ComponentFixture<ManagerBuildView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerBuildView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerBuildView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
