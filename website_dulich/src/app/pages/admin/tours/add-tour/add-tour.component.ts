import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IonContent } from '@ionic/angular/standalone';

import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';

import { TourService } from '../../../../core/services/tour.service';
import { CreateTourRequest } from '../../../../core/models/create-tour-request.model';
import { AdminHeaderComponent } from '../../../../layouts/admin-layout/components/admin-header/admin-header.component';

@Component({
  selector: 'app-add-tour',
  standalone: true,
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    BreadcrumbComponent,
    AdminHeaderComponent,
  ],
})
export class AddTourComponent {
  private readonly tourService = inject(TourService);
  private readonly router = inject(Router);

  isSaving = false;

  selectedFile: File | null = null;

  tour: CreateTourRequest = {
    title: '',
    location: '',
    days: 1,
    price: 0,
    discountPrice: undefined,
    description: '',
    dealEndDate: undefined,
    coverImage: '',
    activities: '',
    tripType: '',
    difficulty: '',
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

    // Tạm thời chỉ lưu tên file.
    // Sau này sẽ upload lên server rồi nhận URL.

    this.tour.coverImage = this.selectedFile.name;
  }

  saveTour(): void {
    if (!this.tour.title.trim()) {
      alert('Tên tour không được để trống.');

      return;
    }

    if (!this.tour.location.trim()) {
      alert('Địa điểm không được để trống.');

      return;
    }

    if (this.tour.days <= 0) {
      alert('Số ngày không hợp lệ.');

      return;
    }

    if (this.tour.price <= 0) {
      alert('Giá tour không hợp lệ.');

      return;
    }

    if (this.tour.discountPrice && this.tour.discountPrice > this.tour.price) {
      alert('Giá khuyến mãi không được lớn hơn giá gốc.');

      return;
    }

    this.isSaving = true;

    this.tourService
      .createTour(this.tour)

      .subscribe({
        next: () => {
          alert('Thêm tour thành công.');

          this.router.navigate(['/admin/tours']);
        },

        error: () => {
          alert('Có lỗi xảy ra.');
        },

        complete: () => {
          this.isSaving = false;
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/admin/tours']);
  }
}
