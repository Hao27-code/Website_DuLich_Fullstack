import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BieuDoDoanhThuComponent } from './bieu-do-doanh-thu.component';

describe('BieuDoDoanhThuComponent', () => {
  let component: BieuDoDoanhThuComponent;
  let fixture: ComponentFixture<BieuDoDoanhThuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BieuDoDoanhThuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BieuDoDoanhThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
