import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TourFilterBarComponent } from './tour-filter-bar.component';

describe('TourFilterBarComponent', () => {
  let component: TourFilterBarComponent;
  let fixture: ComponentFixture<TourFilterBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TourFilterBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
