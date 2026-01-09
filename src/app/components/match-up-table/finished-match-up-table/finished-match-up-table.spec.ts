import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedMatchUpTable } from './finished-match-up-table';

describe('FinishedMatchUpTable', () => {
  let component: FinishedMatchUpTable;
  let fixture: ComponentFixture<FinishedMatchUpTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedMatchUpTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedMatchUpTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
