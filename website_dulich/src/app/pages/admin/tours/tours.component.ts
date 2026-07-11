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
        },

        error: () => {
          this.dialogService.error('Lỗi', 'Không thể tải danh sách tour.');
        },

        complete: () => {
          this.loading = false;
        },
      });
  }
  toggleAll(checked: boolean): void {
    this.allSelected = checked;

    this.selectedTours.clear();

    if (checked) {
      this.tours.forEach((tour) => {
        this.selectedTours.add(tour.id);
      });
    }

    this.selectedTours = new Set(this.selectedTours);
  }

  toggleTour(id: string, checked: boolean): void {
    if (checked) {
      this.selectedTours.add(id);
    } else {
      this.selectedTours.delete(id);
    }

    this.selectedTours = new Set(this.selectedTours);

    this.allSelected = this.selectedTours.size === this.tours.length;
  }
}
