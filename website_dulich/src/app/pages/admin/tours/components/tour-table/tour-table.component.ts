import { Component, Input, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { DecimalPipe, NgClass, NgIf, SlicePipe } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import {
  eyeOutline,
  createOutline,
  trashOutline,
  chevronBackOutline,
  chevronForwardOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TourResponse } from '../../../../../core/models/tour-response.model';
@Component({
  selector: 'app-tour-table',
  templateUrl: './tour-table.component.html',
  styleUrls: ['./tour-table.component.scss'],
  standalone: true,
  imports: [IonIcon, DecimalPipe, NgClass, NgIf, SlicePipe],
})
export class TourTableComponent {
  constructor() {
    addIcons({
      eyeOutline,
      createOutline,
      trashOutline,
      chevronBackOutline,
      chevronForwardOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
    });
  }
  @Input() tours: TourResponse[] = [];

  @Input() loading = false;

  @Input() currentPage = 1;

  @Input() totalItems = 0;

  @Input() totalPages = 1;

  @Input() pageSize = 10;

  @Input() selectedTours = new Set<string>();

  @Input() allSelected = false;

  @Output() toggleAllEvent = new EventEmitter<boolean>();

  @Output() toggleTourEvent = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();
  isSelected(id: string): boolean {
    return this.selectedTours.has(id);
  }

  onToggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    this.toggleAllEvent.emit(checked);
  }

  onToggleTour(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    this.toggleTourEvent.emit({
      id,
      checked,
    });
  }
}
