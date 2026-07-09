import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoverUploadComponent } from './cover-upload.component';

describe('CoverUploadComponent', () => {
  let component: CoverUploadComponent;
  let fixture: ComponentFixture<CoverUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoverUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoverUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
