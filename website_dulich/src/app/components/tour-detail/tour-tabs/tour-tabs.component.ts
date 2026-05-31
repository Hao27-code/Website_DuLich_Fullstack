import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Tour } from 'src/app/models/tour.model';

@Component({
  selector: 'app-tour-tabs',
  templateUrl: './tour-tabs.component.html',
  styleUrls: ['./tour-tabs.component.scss'],
  standalone: true,
})
export class TourTabsComponent {
  @Input({ required: true })
  tour!: Tour;

  activeTab = 'overview';
}
