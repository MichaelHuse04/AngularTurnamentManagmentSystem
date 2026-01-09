import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllPanel } from './controll-panel';

describe('ControllPanel', () => {
  let component: ControllPanel;
  let fixture: ComponentFixture<ControllPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
