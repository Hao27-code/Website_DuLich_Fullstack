import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BieuDoDonDatComponent } from './bieu-do-don-dat.component';

describe('BieuDoDonDatComponent', () => {
  let component: BieuDoDonDatComponent;
  let fixture: ComponentFixture<BieuDoDonDatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BieuDoDonDatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BieuDoDonDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
