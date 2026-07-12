import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
@Component({
  selector: 'app-highlights',
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
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
})
export class HighlightsComponent implements OnChanges {
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
  @Input()
  items: string[] = [];

  @Output()
  highlightsChanged = new EventEmitter<string[]>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.highlights = [...this.items];
    }
  }
  highlights: string[] = [];
  showAddForm = false;
  newHighlight = '';
  editingIndex = -1;

  editingText = '';
  addHighlight(): void {
    if (!this.showAddForm) {
      this.showAddForm = true;

      this.newHighlight = '';

      return;
    }

    const value = this.newHighlight.trim();

    if (!value) {
      return;
    }

    this.highlights.push(value);

    this.newHighlight = '';

    this.showAddForm = false;

    this.highlightsChanged.emit(this.highlights);
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.highlights, event.previousIndex, event.currentIndex);

    this.highlightsChanged.emit(this.highlights);
  }
  edit(index: number): void {
    this.editingIndex = index;

    this.editingText = this.highlights[index];
  }
  saveEdit(): void {
    if (!this.editingText.trim()) {
      return;
    }

    this.highlights[this.editingIndex] = this.editingText.trim();

    this.highlightsChanged.emit(this.highlights);

    this.editingIndex = -1;

    this.editingText = '';
  }
  cancelEdit(): void {
    this.editingIndex = -1;

    this.editingText = '';
  }
  cancelAdd(): void {
    this.showAddForm = false;

    this.newHighlight = '';
  }
  remove(index: number): void {
    this.highlights.splice(index, 1);

    this.highlightsChanged.emit(this.highlights);
  }
}
