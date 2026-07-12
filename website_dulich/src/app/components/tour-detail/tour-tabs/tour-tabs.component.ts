import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Tour } from 'src/app/core/models/tour.model';
import { TourResponse } from '../../../core/models/tour-response.model';

@Component({
  selector: 'app-tour-tabs',
  templateUrl: './tour-tabs.component.html',
  styleUrls: ['./tour-tabs.component.scss'],
  standalone: true,
})
export class TourTabsComponent {
  @Input({ required: true })
  tour!: TourResponse;

  activeTab = 'overview';
}
