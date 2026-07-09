import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { imageOutline, checkmarkOutline } from 'ionicons/icons';
import { CreateTourRequest } from '../../../../../../core/models/create-tour-request.model';
import { IonIcon } from '@ionic/angular/standalone';
@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule, IonIcon],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
})
export class BasicInfoComponent {
  constructor() {
    addIcons({
      imageOutline,
      checkmarkOutline,
    });
  }
  @Input({ required: true }) tour!: CreateTourRequest;
  @Input() imagePreview = '';
  @Input() selectedFile: File | null = null;

  @Output() fileSelected = new EventEmitter<File>();

  /** Danh sách hoạt động đang được chọn */
  selectedActivities: string[] = [];

  emitSelectedFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

    this.fileSelected.emit(this.selectedFile);
  }
  toggleActivity(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (!this.selectedActivities.includes(checkbox.value)) {
        this.selectedActivities.push(checkbox.value);
      }
    } else {
      this.selectedActivities = this.selectedActivities.filter(
        (x) => x !== checkbox.value,
      );
    }

    // cập nhật model gửi API
    this.tour.activities = this.selectedActivities.join(',');
  }
}
