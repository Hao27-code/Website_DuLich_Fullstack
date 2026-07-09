import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IonContent } from '@ionic/angular/standalone';

import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';

import { TourService } from '../../../../core/services/tour.service';
import { CreateTourRequest } from '../../../../core/models/create-tour-request.model';
import { AdminHeaderComponent } from '../../../../layouts/admin-layout/components/admin-header/admin-header.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { AlbumComponent } from './components/album/album.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { FaqComponent } from './components/faq/faq.component';
import { ActionFooterComponent } from './components/action-footer/action-footer.component';
import { UploadService } from '../../../../core/services/upload.service';
import { environment } from '../../../../../environments/environment';
import { AlbumImage } from '../../../../core/models/album-image.model';
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
    BasicInfoComponent,
    AlbumComponent,
    HighlightsComponent,
    ItineraryComponent,
    FaqComponent,
    ActionFooterComponent,
  ],
})
export class AddTourComponent {
  private readonly tourService = inject(TourService);
  private readonly router = inject(Router);
  private readonly uploadService = inject(UploadService);
  isSaving = false;
  imagePreview = '';
  selectedFile: File | null = null;
  albumUrls: string[] = [];
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

  onFileSelected(file: File): void {
    this.selectedFile = file;

    this.uploadService.uploadImage(file).subscribe({
      next: (response) => {
        this.tour.coverImage = response.url;

        this.imagePreview = `${environment.serverUrl}${response.url}`;
      },

      error: () => {
        alert('Upload ảnh thất bại.');
      },
    });
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
  onAlbumChanged(images: AlbumImage[]) {
    this.albumUrls = images.map((x) => x.url);
  }
}
