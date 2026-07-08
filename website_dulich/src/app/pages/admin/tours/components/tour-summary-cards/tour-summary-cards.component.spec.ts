import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TourSummaryCardsComponent } from './tour-summary-cards.component';

describe('TourSummaryCardsComponent', () => {
  let component: TourSummaryCardsComponent;
  let fixture: ComponentFixture<TourSummaryCardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TourSummaryCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourSummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
