import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourResponse } from '../../../core/models/tour-response.model';
import { ItineraryItem } from '../../../core/models/itinerary-item.model';
import { IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  ellipseOutline,
  addCircleOutline,
  removeCircleOutline,
} from 'ionicons/icons';
@Component({
  selector: 'app-tour-tabs',
  templateUrl: './tour-tabs.component.html',
  styleUrls: ['./tour-tabs.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, FormsModule],
})
export class TourTabsComponent implements OnInit {
  @Input({ required: true })
  tour!: TourResponse;

  activeTab = 'overview';
  expandAll: boolean = false;
  expandAllFaq: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    addIcons({
      'location-outline': locationOutline,
      'add-circle-outline': addCircleOutline,
      'remove-circle-outline': removeCircleOutline,
    });
  }

  ngOnInit(): void {
    // Khởi tạo cho Itinerary
    if (this.tour?.itineraries) {
      this.tour.itineraries.forEach((item: ItineraryItem) => {
        if (item.expanded === undefined) {
          item.expanded = false;
        }

        if (typeof item.description === 'string') {
          (item as any).descriptionLines = item.description
            .split('\n')
            .filter((line: string) => line.trim());
        } else if (Array.isArray(item.description)) {
          (item as any).descriptionLines = item.description;
        } else {
          (item as any).descriptionLines = [];
        }
      });
    }

    // Khởi tạo cho FAQ
    if (this.tour?.faqs) {
      this.tour.faqs.forEach((faq: any) => {
        if (faq.expanded === undefined) {
          faq.expanded = false;
        }
      });
    }
  }

  scrollTo(id: string): void {
    this.activeTab = id;
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  trackByFn(index: number, item: any): any {
    return item.dayNumber || index;
  }

  // ===== ITINERARY =====
  toggle(item: any): void {
    item.expanded = !item.expanded;

    const allExpanded = this.tour.itineraries.every((i) => i.expanded === true);
    const allCollapsed = this.tour.itineraries.every(
      (i) => i.expanded === false,
    );

    if (allExpanded) {
      this.expandAll = true;
    } else if (allCollapsed) {
      this.expandAll = false;
    }

    this.cdr.detectChanges();
  }

  toggleAll(): void {
    this.expandAll = !this.expandAll;
    const newState = this.expandAll;

    this.tour.itineraries.forEach((item) => {
      item.expanded = newState;
    });

    this.cdr.detectChanges();
  }

  // ===== FAQ =====
  toggleFaq(index: number): void {
    const faq = this.tour.faqs[index];
    faq.expanded = !faq.expanded;

    const allExpanded = this.tour.faqs.every((f: any) => f.expanded === true);
    const allCollapsed = this.tour.faqs.every((f: any) => f.expanded === false);

    if (allExpanded) {
      this.expandAllFaq = true;
    } else if (allCollapsed) {
      this.expandAllFaq = false;
    }

    this.cdr.detectChanges();
  }

  toggleAllFaq(): void {
    this.expandAllFaq = !this.expandAllFaq;
    const newState = this.expandAllFaq;

    this.tour.faqs.forEach((faq: any) => {
      faq.expanded = newState;
    });

    this.cdr.detectChanges();
  }
}
