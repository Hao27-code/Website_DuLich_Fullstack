import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { TourToolbarComponent } from './components/tour-toolbar/tour-toolbar.component';
import { TourSummaryCardsComponent } from './components/tour-summary-cards/tour-summary-cards.component';
import { TourFilterBarComponent } from './components/tour-filter-bar/tour-filter-bar.component';
import { TourTableComponent } from './components/tour-table/tour-table.component';
import { IonContent } from '@ionic/angular/standalone';
import { AdminHeaderComponent } from '../../../layouts/admin-layout/components/admin-header/admin-header.component';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TourToolbarComponent,
    TourSummaryCardsComponent,
    TourFilterBarComponent,
    TourTableComponent,
    IonContent,
    AdminHeaderComponent,
  ],
})
export class ToursComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
