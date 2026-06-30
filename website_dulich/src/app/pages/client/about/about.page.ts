import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PageBannerComponent } from '../../../components/page-banner/page-banner.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swiper from 'swiper';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';

Swiper.use([Navigation, EffectCoverflow]);

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    PageBannerComponent,
    IonIcon,
    FooterComponent,
  ],
})
export class AboutPage {
  isVideoOpen = false;
  safeVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  openVideo() {
    const url =
      'https://www.youtube.com/embed/-oKeIfLJn70?autoplay=1&start=2&rel=0';

    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    this.isVideoOpen = true;
  }
  closeVideo() {
    this.isVideoOpen = false;
  }
}
