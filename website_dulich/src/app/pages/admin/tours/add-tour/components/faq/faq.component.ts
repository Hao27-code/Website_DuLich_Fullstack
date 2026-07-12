import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FaqItem } from '../../../../../../core/models/faq-item.model';
import { CommonModule } from '@angular/common';
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
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
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
export class FaqComponent implements OnChanges {
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
  @Input() items: FaqItem[] = [];
  @Output() faqsChanged = new EventEmitter<FaqItem[]>();
  showAddForm = false;

  editingIndex = -1;

  editingQuestion = '';
  editingAnswer = '';

  newQuestion = '';
  newAnswer = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.faqs = [...this.items];
    }
  }
  faqs: FaqItem[] = [];

  addFaq(): void {
    if (!this.showAddForm) {
      this.showAddForm = true;
      return;
    }

    if (!this.newQuestion.trim()) {
      return;
    }

    this.faqs.push({
      question: this.newQuestion.trim(),
      answer: this.newAnswer.trim(),
    });

    this.newQuestion = '';
    this.newAnswer = '';

    this.showAddForm = false;

    this.emit();
  }
  cancelAdd(): void {
    this.showAddForm = false;

    this.newQuestion = '';

    this.newAnswer = '';
  }

  edit(index: number): void {
    this.editingIndex = index;

    this.editingQuestion = this.faqs[index].question;

    this.editingAnswer = this.faqs[index].answer;
  }

  saveEdit(): void {
    if (!this.editingQuestion.trim()) {
      return;
    }

    this.faqs[this.editingIndex] = {
      question: this.editingQuestion.trim(),
      answer: this.editingAnswer.trim(),
    };

    this.editingIndex = -1;

    this.editingQuestion = '';

    this.editingAnswer = '';

    this.emit();
  }

  cancelEdit(): void {
    this.editingIndex = -1;

    this.editingQuestion = '';

    this.editingAnswer = '';
  }
  remove(index: number) {
    this.faqs.splice(index, 1);

    this.emit();
  }
  drop(event: CdkDragDrop<FaqItem[]>): void {
    moveItemInArray(this.faqs, event.previousIndex, event.currentIndex);

    this.emit();
  }
  emit() {
    this.faqsChanged.emit(this.faqs);
  }
}
