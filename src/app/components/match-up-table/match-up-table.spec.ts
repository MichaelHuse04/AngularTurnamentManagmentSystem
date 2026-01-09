import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchUpTable } from './match-up-table';

describe('MatchUpTable', () => {
  let component: MatchUpTable;
  let fixture: ComponentFixture<MatchUpTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchUpTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchUpTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
