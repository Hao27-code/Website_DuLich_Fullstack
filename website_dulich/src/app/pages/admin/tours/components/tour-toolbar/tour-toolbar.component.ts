import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, downloadOutline, filterOutline } from 'ionicons/icons';
@Component({
  selector: 'app-tour-toolbar',
  templateUrl: './tour-toolbar.component.html',
  styleUrls: ['./tour-toolbar.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class TourToolbarComponent implements OnInit {
  constructor() {
    addIcons({
      addOutline,
      downloadOutline,
      filterOutline,
    });
  }
  ngOnInit() {}
}
