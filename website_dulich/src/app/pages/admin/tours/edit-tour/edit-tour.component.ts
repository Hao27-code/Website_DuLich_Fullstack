import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../../core/services/tour.service';
import { CreateTourRequest } from '../../../../core/models/create-tour-request.model';
import { UpdateTourRequest } from '../../../../core/models/update-tour-request.model';
import { TourFormComponent } from '../add-tour/components/tour-form/tour-form.component';
import { UploadService } from '../../../../core/services/upload.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss'],
  standalone: true,
  imports: [TourFormComponent],
})
export class EditTourComponent implements OnInit {
  constructor() {}
  private route = inject(ActivatedRoute);

  private tourService = inject(TourService);

  private router = inject(Router);
  private readonly uploadService = inject(UploadService);
  imagePreview = '';

  selectedFile: File | null = null;

  isSaving = false;

  tourId = '';
  tour: UpdateTourRequest = {
    title: '',

    location: '',

    days: 1,

    price: 0,

    discountPrice: undefined,

    description: '',

    dealEndDate: undefined,

    coverImage: '',

    albumImages: [],

    activities: '',

    tripType: '',

    difficulty: '',

    highlights: [],

    itineraries: [],

    faqs: [],
  };
  ngOnInit() {
    this.tourId = this.route.snapshot.paramMap.get('id')!;

    this.loadTour();
  }

  loadTour() {
    this.tourService

      .getTourById(this.tourId)

      .subscribe({
        next: (res) => {
          this.tour = {
            title: res.title,
            location: res.location,
            days: res.days,
            price: res.price,
            discountPrice: res.discountPrice,
            description: res.description,
            dealEndDate: res.dealEndDate,
            coverImage: res.coverImage,

            albumImages: res.albumImages,

            activities: res.activities,

            tripType: res.tripType,

            difficulty: res.difficulty,

            highlights: res.highlights,

            itineraries: res.itineraries,

            faqs: res.faqs,
          };
          this.imagePreview = `${environment.serverUrl}${res.coverImage}`;
        },
      });
  }
  onFileSelected(file: File): void {
    this.selectedFile = file;

    this.uploadService.uploadImage(file).subscribe({
      next: (response) => {
        this.tour.coverImage = response.url;

        this.imagePreview = `${environment.serverUrl}${response.url}`;
      },
    });
  }
  save(): void {
    this.isSaving = true;

    this.tourService.updateTour(this.tourId, this.tour).subscribe({
      next: () => {
        alert('Cập nhật thành công');

        this.router.navigate(['/admin/tours']);
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
