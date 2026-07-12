import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { TourToolbarComponent } from './components/tour-toolbar/tour-toolbar.component';
import { TourSummaryCardsComponent } from './components/tour-summary-cards/tour-summary-cards.component';
import { TourFilterBarComponent } from './components/tour-filter-bar/tour-filter-bar.component';
import { TourTableComponent } from './components/tour-table/tour-table.component';
import { IonContent } from '@ionic/angular/standalone';
import { AdminHeaderComponent } from '../../../layouts/admin-layout/components/admin-header/admin-header.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { TourService } from '../../../core/services/tour.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { TourResponse } from '../../../core/models/tour-response.model';
import { TourFilter } from '../../../core/models/tour-filter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TourStatisticsResponse } from '../../../core/models/tour-statistics-response.model';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TourToolbarComponent,
    TourSummaryCardsComponent,
    TourFilterBarComponent,
    TourTableComponent,
    IonContent,
    AdminHeaderComponent,
    DialogComponent,
  ],
})
export class ToursComponent implements OnInit {
  private readonly tourService = inject(TourService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogService = inject(DialogService);
  selectedTours = new Set<string>();

  allSelected = false;
  tours: TourResponse[] = [];

  loading = false;

  totalItems = 0;

  totalPages = 1;

  currentPage = 1;

  query: TourFilter = {
    page: 1,
    limit: 10,
  };

  ngOnInit(): void {
    this.loadTours();

    this.loadStatistics();
  }

  loadTours(): void {
    this.loading = true;

    this.tourService
      .getTours(this.query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.tours = response.data;

          this.totalItems = response.total;

          this.totalPages = response.totalPages;

          this.currentPage = response.page;

          this.resetSelection();
        },

        error: () => {
          this.dialogService.error('Lỗi', 'Không thể tải danh sách tour.');
        },

        complete: () => {
          this.loading = false;
        },
      });
  }

  exportExcel(): void {
    this.tourService.exportExcel(this.query).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;
        link.download = `Tours.xlsx`;

        link.click();

        window.URL.revokeObjectURL(url);
      },

      error: () => {
        this.dialogService.error('Lỗi', 'Không thể xuất file Excel.');
      },
    });
  }

  private readonly router = inject(Router);

  goToAddTour(): void {
    this.router.navigate(['/admin/tours/add']);
  }
  readonly pageSize = 10;
  onFilterChanged(filter: TourFilter): void {
    this.query = {
      ...filter,
      page: 1,
      limit: this.pageSize,
    };

    this.loadTours();
  }

  previousPage(): void {
    if (this.currentPage <= 1) {
      return;
    }

    this.query.page = this.currentPage - 1;

    this.loadTours();
  }
  nextPage(): void {
    if (this.currentPage >= this.totalPages) {
      return;
    }

    this.query.page = this.currentPage + 1;

    this.loadTours();
  }
  statistics: TourStatisticsResponse = {
    totalTours: 0,

    activeTours: 0,

    upcomingTours: 0,

    inactiveTours: 0,
  };

  loadStatistics(): void {
    this.tourService
      .getStatistics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.statistics = response;
        },

        error: () => {
          this.dialogService.error('Lỗi', 'Không thể tải thống kê.');
        },
      });
  }
  bulkDelete(ids: string[]): void {
    if (ids.length === 0) {
      return;
    }

    this.dialogService.confirm({
      title: 'Xóa tour',

      message: `Bạn có chắc muốn xóa ${ids.length} tour đã chọn?`,

      confirmText: 'Xóa',

      cancelText: 'Hủy',

      onConfirm: () => {
        this.tourService
          .bulkDelete(ids)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.dialogService.success('Thành công', 'Đã xóa tour.');

              this.resetSelection();

              this.loadTours();

              this.loadStatistics();
            },

            error: () => {
              this.dialogService.error('Lỗi', 'Không thể xóa tour.');
            },
          });
      },
    });
  }
  bulkActivate(ids: string[]): void {
    if (!ids.length) {
      return;
    }

    this.dialogService.confirm({
      title: 'Mở bán tour',

      message: `Mở bán ${ids.length} tour đã chọn?`,

      confirmText: 'Đồng ý',

      cancelText: 'Hủy',

      onConfirm: () => {
        this.tourService
          .bulkUpdateStatus(ids, true)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.dialogService.success('Thành công', 'Đã mở bán tour.');

              this.resetSelection();

              this.loadTours();

              this.loadStatistics();
            },

            error: () => {
              this.dialogService.error('Lỗi', 'Không thể xóa tour.');
            },
          });
      },
    });
  }
  bulkDeactivate(ids: string[]): void {
    if (!ids.length) {
      return;
    }

    this.dialogService.confirm({
      title: 'Ngừng bán',

      message: `Ngừng bán ${ids.length} tour đã chọn?`,

      confirmText: 'Đồng ý',

      cancelText: 'Hủy',

      onConfirm: () => {
        this.tourService
          .bulkUpdateStatus(ids, false)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.dialogService.success('Thành công', 'Đã ngừng bán tour.');

              this.resetSelection();

              this.loadTours();

              this.loadStatistics();
            },

            error: () => {
              this.dialogService.error('Lỗi', 'Không thể xóa tour.');
            },
          });
      },
    });
  }
  onToggleAll(checked: boolean): void {
    this.selectedTours.clear();

    if (checked) {
      this.tours.forEach((tour) => {
        this.selectedTours.add(tour.id);
      });
    }

    this.allSelected = checked;
  }
  onToggleTour(event: { id: string; checked: boolean }): void {
    if (event.checked) {
      this.selectedTours.add(event.id);
    } else {
      this.selectedTours.delete(event.id);
    }

    this.allSelected =
      this.tours.length > 0 && this.selectedTours.size === this.tours.length;
  }

  private resetSelection(): void {
    this.selectedTours.clear();

    this.allSelected = false;
  }

  editTour(id: string): void {
    this.router.navigate(['/admin/tours/edit', id]);
  }
}
