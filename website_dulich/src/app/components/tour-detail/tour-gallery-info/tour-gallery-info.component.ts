import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../../core/models/tour.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { TourResponse } from '../../../core/models/tour-response.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tour-gallery-info',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tour-gallery-info.component.html',
  styleUrls: ['./tour-gallery-info.component.scss'],
})
export class TourGalleryInfoComponent {
  readonly serverUrl = environment.serverUrl;
  @Input({ required: true })
  tour!: TourResponse;
}
