import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import { IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { searchOutline, refreshOutline, filterOutline } from 'ionicons/icons';

import Choices from 'choices.js';
import { first } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { TourFilter } from '../../../../../core/models/tour-filter.model';

@Component({
  selector: 'app-tour-filter-bar',
  standalone: true,
  imports: [IonIcon, FormsModule],
  templateUrl: './tour-filter-bar.component.html',
  styleUrls: ['./tour-filter-bar.component.scss'],
})
export class TourFilterBarComponent {
  constructor() {
    addIcons({
      searchOutline,
      refreshOutline,
      filterOutline,
    });
  }

  query: TourFilter = {
    keyword: '',
    isActive: null,
    sort: '',
    page: 1,
    limit: 10,
  };
  @Output() filterChanged = new EventEmitter<TourFilter>();

  applyFilter(): void {
    this.filterChanged.emit({ ...this.query });
  }
  resetFilter(): void {
    this.query = {
      keyword: '',
      isActive: null,
      sort: '',
      page: 1,
      limit: 10,
    };

    this.filterChanged.emit({ ...this.query });
  }
}
