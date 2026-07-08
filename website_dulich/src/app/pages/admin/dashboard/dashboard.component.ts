import { Component } from '@angular/core';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { BangDonDatMoiComponent } from './components/bang-don-dat-moi/bang-don-dat-moi.component';
import { BangTourNoiBatComponent } from './components/bang-tour-noi-bat/bang-tour-noi-bat.component';
import { BieuDoDoanhThuComponent } from './components/bieu-do-doanh-thu/bieu-do-doanh-thu.component';
import { BieuDoDonDatComponent } from './components/bieu-do-don-dat/bieu-do-don-dat.component';
import { TheThongKeComponent } from './components/the-thong-ke/the-thong-ke.component';
import { addIcons } from 'ionicons';
import { AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import flatpickr from 'flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import {
  menuOutline,
  searchOutline,
  notificationsOutline,
  chevronDownOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import Instance = flatpickr.Instance;
import { AdminHeaderComponent } from '../../../layouts/admin-layout/components/admin-header/admin-header.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonIcon,
    TheThongKeComponent,
    BieuDoDoanhThuComponent,
    BieuDoDonDatComponent,
    BangTourNoiBatComponent,
    BangDonDatMoiComponent,
    FormsModule,
    AdminHeaderComponent,
  ],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  constructor() {
    addIcons({
      menuOutline,
      searchOutline,
      notificationsOutline,
      chevronDownOutline,
    });
  }
  /**
   * Tham chiếu đến ô chọn khoảng thời gian.
   */

  refreshData() {}

  /**
   * Từ khóa tìm kiếm.
   */
  keyword = '';

  /**
   * Hiển thị popup kết quả.
   */
  showResult = false;

  /**
   * Trạng thái đang tìm kiếm.
   */
  isLoading = false;
  @ViewChild('dateRange')
  dateRange!: ElementRef<HTMLInputElement>;
  private flatpickrInstance?: Instance;
  ngAfterViewInit(): void {
    this.flatpickrInstance = flatpickr(this.dateRange.nativeElement, {
      mode: 'range',
      dateFormat: 'd/m/Y',
      locale: Vietnamese,
    });
  }
  ngOnDestroy(): void {
    this.flatpickrInstance?.destroy();
  }
}
