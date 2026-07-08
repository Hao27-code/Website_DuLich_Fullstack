import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { DashboardStatisticCard } from '../../models/dashboard-statistic-card.model';
import { addIcons } from 'ionicons';

import {
  briefcaseOutline,
  newspaperOutline,
  peopleOutline,
  calendarOutline,
  caretUpOutline,
} from 'ionicons/icons';
@Component({
  selector: 'app-the-thong-ke',
  templateUrl: './the-thong-ke.component.html',
  styleUrls: ['./the-thong-ke.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class TheThongKeComponent implements OnInit {
  statistics: DashboardStatisticCard[] = [
    {
      title: 'Tổng số tour',
      value: 128,
      icon: 'briefcase-outline',
      backgroundColor: '#e4f6e2',
      iconColor: '#2fb344',
      percent: 12,
    },
    {
      title: 'Tổng số bài viết',
      value: 56,
      icon: 'newspaper-outline',
      backgroundColor: '#ddecfb',
      iconColor: '#2f80ed',
      percent: 8,
    },
    {
      title: 'Tổng người dùng',
      value: 1256,
      icon: 'people-outline',
      backgroundColor: '#eee3ff',
      iconColor: '#8a45e6',
      percent: 15,
    },
    {
      title: 'Tổng đơn đặt tour',
      value: 342,
      icon: 'calendar-outline',
      backgroundColor: '#fff0d9',
      iconColor: '#ff9800',
      percent: 18,
    },
  ];

  constructor() {
    addIcons({
      briefcaseOutline,
      newspaperOutline,
      peopleOutline,
      calendarOutline,
      caretUpOutline,
    });
  }

  ngOnInit() {}
}
