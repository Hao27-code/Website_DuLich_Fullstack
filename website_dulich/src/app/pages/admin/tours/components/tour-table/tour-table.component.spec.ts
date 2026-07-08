import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TourTableComponent } from './tour-table.component';

describe('TourTableComponent', () => {
  let component: TourTableComponent;
  let fixture: ComponentFixture<TourTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TourTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
