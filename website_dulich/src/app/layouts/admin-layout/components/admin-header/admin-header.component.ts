import { Component, OnInit } from '@angular/core';
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  imports: [IonIcon],
})
export class AdminHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
