import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TourTabsComponent } from './tour-tabs.component';

describe('TourTabsComponent', () => {
  let component: TourTabsComponent;
  let fixture: ComponentFixture<TourTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TourTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
