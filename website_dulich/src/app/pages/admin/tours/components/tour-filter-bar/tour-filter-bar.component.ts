import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { searchOutline, refreshOutline, filterOutline } from 'ionicons/icons';

import Choices from 'choices.js';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tour-filter-bar',
  standalone: true,
  imports: [IonIcon],
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
}
