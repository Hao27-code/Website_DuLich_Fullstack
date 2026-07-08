import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BangTourNoiBatComponent } from './bang-tour-noi-bat.component';

describe('BangTourNoiBatComponent', () => {
  let component: BangTourNoiBatComponent;
  let fixture: ComponentFixture<BangTourNoiBatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BangTourNoiBatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BangTourNoiBatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
