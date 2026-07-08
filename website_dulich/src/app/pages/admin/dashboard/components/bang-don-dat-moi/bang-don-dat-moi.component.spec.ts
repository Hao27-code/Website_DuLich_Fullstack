import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BangDonDatMoiComponent } from './bang-don-dat-moi.component';

describe('BangDonDatMoiComponent', () => {
  let component: BangDonDatMoiComponent;
  let fixture: ComponentFixture<BangDonDatMoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BangDonDatMoiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BangDonDatMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
