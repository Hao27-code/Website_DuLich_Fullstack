import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TourGalleryInfoComponent } from '../../../components/tour-detail/tour-gallery-info/tour-gallery-info.component';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { PageBannerComponent } from '../../../components/page-banner/page-banner.component';
import { TourTabsComponent } from '../../../components/tour-detail/tour-tabs/tour-tabs.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TourResponse } from '../../../core/models/tour-response.model';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.page.html',
  styleUrls: ['./tour-details.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TourGalleryInfoComponent,
    PageBannerComponent,
    RouterModule,
    TourTabsComponent,
    IonicModule,
  ],
})
export class TourDetailsPage implements OnInit {
  @Input({ required: true })
  tour!: TourResponse;
  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.tourService.getTourById(id).subscribe({
      next: (res) => {
        console.log(res);

        this.tour = res;
      },
      error: (err) => {
        console.log('ERROR', err);
      },
    });
  }
}
