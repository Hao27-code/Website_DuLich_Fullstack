import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  searchOutline,
  notificationsOutline,
  chevronDownOutline,
} from 'ionicons/icons';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  imports: [IonIcon],
})
export class AdminHeaderComponent implements OnInit {
  constructor() {
    addIcons({
      menuOutline,
      searchOutline,
      notificationsOutline,
      chevronDownOutline,
    });
  }

  ngOnInit() {}
}
