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
import { ItineraryItem } from '../../../../core/models/itinerary-item.model';
import { FaqItem } from '../../../../core/models/faq-item.model';
import { TourFormComponent } from './components/tour-form/tour-form.component';
import { DialogService } from '../../../../shared/services/dialog.service';
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
    TourFormComponent,
  ],
})
export class AddTourComponent {
  private readonly tourService = inject(TourService);
  private readonly router = inject(Router);
  private readonly uploadService = inject(UploadService);
  private readonly dialogService = inject(DialogService);
  isSaving = false;
  imagePreview = '';
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
    albumImages: [], //chọn nhiều hình ảnh
    highlights: [], //điểm nổi bật
    itineraries: [], //lịch trình
    faqs: [], //faq
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
        this.dialogService.error(
          'Upload thất bại',
          'Không thể tải ảnh lên máy chủ.',
        );
      },
    });
  }

  saveTour(): void {
    if (!this.validateForm()) {
      return;
    }

    this.normalizeData();

    this.isSaving = true;

    this.tourService.createTour(this.tour).subscribe({
      next: () => {
        this.isSaving = false;

        this.dialogService.success('Thành công', 'Đã thêm tour thành công.');

        setTimeout(() => {
          this.router.navigate(['/admin/tours']);
        }, 1200);
      },

      error: (err) => {
        this.isSaving = false;
        this.handleApiError(err.status);
      },
    });
  }
  private normalizeData(): void {
    this.tour.title = this.tour.title.trim();

    this.tour.location = this.tour.location.trim();

    this.tour.description = this.tour.description.trim();

    this.tour.highlights = this.tour.highlights.map((x) => x.trim());

    this.tour.itineraries = this.tour.itineraries.map((x) => ({
      ...x,
      title: x.title.trim(),
      description: x.description.trim(),
    }));

    this.tour.faqs = this.tour.faqs.map((x) => ({
      question: x.question.trim(),
      answer: x.answer.trim(),
    }));
  }
  private handleApiError(status: number): void {
    switch (status) {
      case 400:
        this.dialogService.warning(
          'Dữ liệu không hợp lệ',
          'Vui lòng kiểm tra lại thông tin.',
        );
        break;

      case 401:
        this.dialogService.error(
          'Chưa đăng nhập',
          'Vui lòng đăng nhập để tiếp tục.',
        );
        break;

      case 403:
        this.dialogService.error(
          'Không có quyền',
          'Bạn không có quyền thực hiện chức năng này.',
        );
        break;

      case 404:
        this.dialogService.error(
          'Không tìm thấy',
          'Không tìm thấy tài nguyên yêu cầu.',
        );
        break;

      case 500:
        this.dialogService.error('Lỗi máy chủ', 'Máy chủ đang gặp sự cố.');
        break;

      default:
        this.dialogService.error('Lỗi', 'Không thể kết nối tới máy chủ.');
        break;
    }
  }
  private validateForm(): boolean {
    if (!this.tour.title.trim()) {
      this.dialogService.warning(
        'Thiếu thông tin',
        'Tên tour không được để trống.',
      );
      return false;
    }

    if (!this.tour.location.trim()) {
      this.dialogService.warning(
        'Thiếu thông tin',
        'Địa điểm không được để trống.',
      );
      return false;
    }

    if (this.tour.days <= 0) {
      this.dialogService.warning(
        'Dữ liệu không hợp lệ',
        'Số ngày phải lớn hơn 0.',
      );
      return false;
    }

    if (this.tour.price <= 0) {
      this.dialogService.warning(
        'Dữ liệu không hợp lệ',
        'Giá tour phải lớn hơn 0.',
      );
      return false;
    }

    if (
      this.tour.discountPrice !== undefined &&
      this.tour.discountPrice > this.tour.price
    ) {
      this.dialogService.warning(
        'Dữ liệu không hợp lệ',
        'Giá khuyến mãi không được lớn hơn giá gốc.',
      );
      return false;
    }
    if (!this.tour.coverImage) {
      this.dialogService.warning('Thiếu ảnh', 'Vui lòng chọn ảnh đại diện.');

      return false;
    }
    if (this.tour.highlights.length === 0) {
      this.dialogService.warning(
        'Thiếu dữ liệu',
        'Vui lòng thêm ít nhất một điểm nổi bật.',
      );

      return false;
    }
    if (this.tour.itineraries.length === 0) {
      this.dialogService.warning(
        'Thiếu dữ liệu',
        'Vui lòng thêm ít nhất một lịch trình.',
      );

      return false;
    }
    if (this.tour.faqs.length === 0) {
      this.dialogService.warning(
        'Thiếu dữ liệu',
        'Vui lòng thêm ít nhất một FAQ.',
      );

      return false;
    }

    // =============================
    // Kiểm tra Highlight rỗng
    // =============================

    if (this.tour.highlights.some((x) => !x.trim())) {
      this.dialogService.warning(
        'Dữ liệu không hợp lệ',
        'Điểm nổi bật không được để trống.',
      );
      return false;
    }

    // =============================
    // Kiểm tra Itinerary
    // =============================

    for (const item of this.tour.itineraries) {
      if (!item.title.trim()) {
        this.dialogService.warning(
          'Thiếu thông tin',
          'Tiêu đề lịch trình không được để trống.',
        );
        return false;
      }

      if (!item.description.trim()) {
        this.dialogService.warning(
          'Thiếu thông tin',
          'Mô tả lịch trình không được để trống.',
        );
        return false;
      }
    }

    // =============================
    // Kiểm tra FAQ
    // =============================

    for (const faq of this.tour.faqs) {
      if (!faq.question.trim()) {
        this.dialogService.warning(
          'Thiếu thông tin',
          'Câu hỏi FAQ không được để trống.',
        );
        return false;
      }

      if (!faq.answer.trim()) {
        this.dialogService.warning(
          'Thiếu thông tin',
          'Câu trả lời FAQ không được để trống.',
        );
        return false;
      }
    }

    return true;
  }
  cancel(): void {
    this.router.navigate(['/admin/tours']);
  }
  onAlbumChanged(urls: string[]) {
    this.tour.albumImages = [...urls];
  }
  onHighlightsChanged(items: string[]) {
    this.tour.highlights = [...items];
  }
  onItinerariesChanged(items: ItineraryItem[]) {
    this.tour.itineraries = [...items];
  }
  onFaqsChanged(items: FaqItem[]) {
    this.tour.faqs = [...items];
  }
}
