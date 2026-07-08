import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import {
  home,
  people,
  settings,
  newspaperOutline,
  briefcaseOutline,
  calendarOutline,
  logOutOutline,
  chevronForwardOutline,
  ellipse,
  add,
  pricetagOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({
  home,
  people,
  settings,
  newspaperOutline,
  briefcaseOutline,
  calendarOutline,
  logOutOutline,
  chevronForwardOutline,
  ellipse,
  add,
  pricetagOutline,
});
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
  ],
})
export class AdminSidebarComponent {
  constructor() {
    addIcons({
      home,
      people,
      settings,
      newspaperOutline,
      briefcaseOutline,
      calendarOutline,
      logOutOutline,
      chevronForwardOutline,
      ellipse,
      add,
      pricetagOutline,
    });
  }
}
