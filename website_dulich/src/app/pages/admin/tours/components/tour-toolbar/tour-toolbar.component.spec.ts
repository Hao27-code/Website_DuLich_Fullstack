import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TourToolbarComponent } from './tour-toolbar.component';

describe('TourToolbarComponent', () => {
  let component: TourToolbarComponent;
  let fixture: ComponentFixture<TourToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TourToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
