import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../core/models/tour.model';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TourResponse } from '../../core/models/tour-response.model';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss'],
  imports: [DecimalPipe, CommonModule, RouterLink],
})
export class TourCardComponent {
  @Input({ required: true }) tour!: TourResponse;
}
