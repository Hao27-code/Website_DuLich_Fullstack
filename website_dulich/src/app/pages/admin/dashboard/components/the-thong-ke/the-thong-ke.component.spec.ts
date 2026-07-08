import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TheThongKeComponent } from './the-thong-ke.component';

describe('TheThongKeComponent', () => {
  let component: TheThongKeComponent;
  let fixture: ComponentFixture<TheThongKeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TheThongKeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TheThongKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
