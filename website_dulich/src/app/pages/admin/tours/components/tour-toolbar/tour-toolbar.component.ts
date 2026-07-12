import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, downloadOutline } from 'ionicons/icons';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-tour-toolbar',
  templateUrl: './tour-toolbar.component.html',
  styleUrls: ['./tour-toolbar.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class TourToolbarComponent implements OnInit {
  @Output() export = new EventEmitter<void>();

  @Output() add = new EventEmitter<void>();
  constructor() {
    addIcons({
      addOutline,
      downloadOutline,
    });
  }
  ngOnInit() {}

  onExport(): void {
    this.export.emit();
  }

  onAdd(): void {
    this.add.emit();
  }
}
