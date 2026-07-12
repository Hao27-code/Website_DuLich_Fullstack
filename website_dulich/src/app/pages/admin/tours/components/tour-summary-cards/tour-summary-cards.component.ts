import { Component, Input, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  airplaneOutline,
  checkmarkCircleOutline,
  timeOutline,
  closeCircleOutline,
  trendingUpOutline,
} from 'ionicons/icons';
import { TourStatisticsResponse } from '../../../../../core/models/tour-statistics-response.model';
@Component({
  selector: 'app-tour-summary-cards',
  templateUrl: './tour-summary-cards.component.html',
  styleUrls: ['./tour-summary-cards.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class TourSummaryCardsComponent {
  constructor() {
    addIcons({
      airplaneOutline,
      checkmarkCircleOutline,
      timeOutline,
      closeCircleOutline,
      trendingUpOutline,
    });
  }
  @Input({ required: true })
  statistics!: TourStatisticsResponse;

  get summaryCards() {
    return [
      {
        title: 'Tổng tour',
        value: this.statistics.totalTours,
        icon: 'airplane-outline',
        color: '#2563EB',
        background: '#DBEAFE',
        description: 'Toàn hệ thống',
      },

      {
        title: 'Đang mở bán',
        value: this.statistics.activeTours,
        icon: 'checkmark-circle-outline',
        color: '#16A34A',
        background: '#DCFCE7',
        description: 'Đang hoạt động',
      },

      {
        title: 'Sắp khởi hành',
        value: this.statistics.upcomingTours,
        icon: 'time-outline',
        color: '#D97706',
        background: '#FEF3C7',
        description: '7 ngày tới',
      },

      {
        title: 'Ngừng kinh doanh',
        value: this.statistics.inactiveTours,
        icon: 'close-circle-outline',
        color: '#DC2626',
        background: '#FEE2E2',
        description: 'Đã khóa',
      },
    ];
  }
}
