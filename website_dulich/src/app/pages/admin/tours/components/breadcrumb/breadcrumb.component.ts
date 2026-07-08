import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { homeOutline } from 'ionicons/icons';

import { addIcons } from 'ionicons';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  imports: [IonIcon, RouterLink],
})
export class BreadcrumbComponent implements OnInit {
  constructor() {
    addIcons({
      homeOutline,
    });
  }

  ngOnInit() {}
}
