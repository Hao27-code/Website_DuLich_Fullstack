import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CreateTourRequest } from '../../../../../../core/models/create-tour-request.model';
import { AlbumImage } from '../../../../../../core/models/album-image.model';
import { ItineraryItem } from '../../../../../../core/models/itinerary-item.model';
import { FaqItem } from '../../../../../../core/models/faq-item.model';

import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { AlbumComponent } from '../album/album.component';
import { HighlightsComponent } from '../highlights/highlights.component';
import { ItineraryComponent } from '../itinerary/itinerary.component';
import { FaqComponent } from '../faq/faq.component';
import { ActionFooterComponent } from '../action-footer/action-footer.component';

@Component({
  selector: 'app-tour-form',
  standalone: true,
  imports: [
    CommonModule,
    BasicInfoComponent,
    AlbumComponent,
    HighlightsComponent,
    ItineraryComponent,
    FaqComponent,
    ActionFooterComponent,
  ],
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.scss'],
})
export class TourFormComponent {
  @Input({ required: true }) tour!: CreateTourRequest;
  @Input() isEditMode = false;
  @Input() imagePreview = '';

  @Input() selectedFile: File | null = null;

  @Input() isSaving = false;

  @Output() coverSelected = new EventEmitter<File>();

  @Output() albumChanged = new EventEmitter<string[]>();

  @Output() highlightsChanged = new EventEmitter<string[]>();

  @Output() itinerariesChanged = new EventEmitter<ItineraryItem[]>();

  @Output() faqsChanged = new EventEmitter<FaqItem[]>();

  @Output() save = new EventEmitter<void>();

  @Output() cancelClicked = new EventEmitter<void>();
}
