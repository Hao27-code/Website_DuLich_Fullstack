import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItineraryItem } from '../../../../../../core/models/itinerary-item.model';
import {
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  CdkDragDrop,
  CdkDragHandle,
} from '@angular/cdk/drag-drop';
import { IonIcon } from '@ionic/angular/standalone';
import {
  addOutline,
  checkmarkOutline,
  closeOutline,
  createOutline,
  trashOutline,
  reorderThreeOutline,
  star,
} from 'ionicons/icons';

import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
    CommonModule,
    FormsModule,
    IonIcon,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
  ],
})
export class ItineraryComponent implements OnInit {
  constructor() {
    addIcons({
      addOutline,
      checkmarkOutline,
      closeOutline,
      createOutline,
      trashOutline,
      reorderThreeOutline,
      star,
    });
  }

  @Input() items: ItineraryItem[] = [];
  newItem: ItineraryItem = {
    dayNumber: 1,
    title: '',
    description: '',
  };

  showAddForm = false;

  editingIndex = -1;

  editingItem: ItineraryItem = {
    dayNumber: 1,
    title: '',
    description: '',
  };

  ngOnInit() {
    this.itineraries = [...this.items];
  }
  itineraries: ItineraryItem[] = [];

  @Output() itinerariesChanged = new EventEmitter<ItineraryItem[]>();

  addItem(): void {
    if (!this.showAddForm) {
      this.showAddForm = true;

      this.newItem = {
        dayNumber: this.itineraries.length + 1,
        title: '',
        description: '',
      };

      return;
    }

    if (!this.newItem.title.trim()) {
      return;
    }

    this.itineraries.push({
      ...this.newItem,
    });

    this.showAddForm = false;

    this.emit();
  }

  drop(event: CdkDragDrop<ItineraryItem[]>) {
    moveItemInArray(this.itineraries, event.previousIndex, event.currentIndex);

    this.itineraries.forEach((x, i) => {
      x.dayNumber = i + 1;
    });

    this.emit();
  }
  cancelAdd(): void {
    this.showAddForm = false;

    this.newItem = {
      dayNumber: this.itineraries.length + 1,
      title: '',
      description: '',
    };
  }
  edit(index: number): void {
    this.editingIndex = index;

    this.editingItem = {
      ...this.itineraries[index],
    };
  }
  saveEdit(): void {
    if (!this.editingItem.title.trim()) {
      return;
    }

    this.itineraries[this.editingIndex] = {
      ...this.editingItem,
    };

    this.editingIndex = -1;

    this.emit();
  }
  cancelEdit(): void {
    this.editingIndex = -1;
  }
  remove(index: number) {
    this.itineraries.splice(index, 1);

    this.itineraries.forEach((x, i) => {
      x.dayNumber = i + 1;
    });

    this.emit();
  }

  emit() {
    this.itinerariesChanged.emit(this.itineraries);
  }
}
