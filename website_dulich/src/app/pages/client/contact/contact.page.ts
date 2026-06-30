import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  locationOutline,
  callOutline,
  mailOutline,
  play,
} from 'ionicons/icons';

import { addIcons } from 'ionicons';
import { PageBannerComponent } from '../../../components/page-banner/page-banner.component';
import { FooterComponent } from '../../../components/footer/footer.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    PageBannerComponent,
    FooterComponent,
  ],
})
export class ContactPage {
  showVideo = false;
  youtubeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    addIcons({
      'location-outline': locationOutline,
      'call-outline': callOutline,
      'mail-outline': mailOutline,
      play: play,
    });
  }

  openYoutube() {
    this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/cQfIUPw72Dk?autoplay=1',
    );

    this.showVideo = true;
  }

  closeYoutube() {
    this.showVideo = false;
  }
}
