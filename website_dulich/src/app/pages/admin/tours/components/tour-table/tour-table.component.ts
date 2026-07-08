import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import {
  eyeOutline,
  createOutline,
  trashOutline,
  chevronBackOutline,
  chevronForwardOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';

addIcons({
  eyeOutline,
  createOutline,
  trashOutline,
  chevronBackOutline,
  chevronForwardOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
});
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-tour-table',
  templateUrl: './tour-table.component.html',
  styleUrls: ['./tour-table.component.scss'],
  standalone: true,
  imports: [IonIcon, DecimalPipe, NgClass, NgIf],
})
export class TourTableComponent implements OnInit {
  constructor() {
    addIcons({
      eyeOutline,
      createOutline,
      trashOutline,
      chevronBackOutline,
      chevronForwardOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
    });
  }

  ngOnInit() {}

  tours = [
    {
      id: 1,
      image: 'assets/images/tours/tour1.jpg',
      title: 'Tour Ninh Thuận 3N2Đ',
      description: 'Khám phá vùng đất nắng gió',
      category: 'Du lịch biển',
      destination: 'Ninh Thuận',
      days: '3 ngày 2 đêm',
      oldPrice: 6500000,
      salePrice: 5200000,
      status: 'Đang mở bán',
      views: 1245,
    },
    {
      id: 2,
      image: 'assets/images/tours/tour2.jpg',
      title: 'Tour Đà Nẵng - Hội An 4N3Đ',
      description: 'Trải nghiệm phố cổ & biển xanh',
      category: 'Du lịch biển',
      destination: 'Đà Nẵng',
      days: '4 ngày 3 đêm',
      oldPrice: 7800000,
      salePrice: 6490000,
      status: 'Đang mở bán',
      views: 2156,
    },
    {
      id: 3,
      image: 'assets/images/tours/tour3.jpg',
      title: 'Tour Phú Quốc 3N2Đ',
      description: 'Thiên đường biển đảo',
      category: 'Du lịch biển',
      destination: 'Phú Quốc',
      days: '3 ngày 2 đêm',
      oldPrice: 5900000,
      salePrice: 4990000,
      status: 'Sắp khởi hành',
      views: 1856,
    },
    {
      id: 4,
      image: 'assets/images/tours/tour4.jpg',
      title: 'Tour Hà Giang 4N3Đ',
      description: 'Khám phá cao nguyên đá',
      category: 'Du lịch núi',
      destination: 'Hà Giang',
      days: '4 ngày 3 đêm',
      oldPrice: 6900000,
      salePrice: 5900000,
      status: 'Đang mở bán',
      views: 1102,
    },
    {
      id: 5,
      image: 'assets/images/tours/tour5.jpg',
      title: 'Tour Sapa 3N2Đ',
      description: 'Fansipan & bản Cát Cát',
      category: 'Du lịch núi',
      destination: 'Sapa',
      days: '3 ngày 2 đêm',
      oldPrice: 5500000,
      salePrice: 4500000,
      status: 'Đang mở bán',
      views: 987,
    },
    {
      id: 6,
      image: 'assets/images/tours/tour6.jpg',
      title: 'Tour Singapore - Malaysia 5N4Đ',
      description: 'Khám phá quốc đảo sư tử',
      category: 'Du lịch quốc tế',
      destination: 'Singapore',
      days: '5 ngày 4 đêm',
      oldPrice: 15900000,
      salePrice: 13500000,
      status: 'Đang mở bán',
      views: 756,
    },
    {
      id: 7,
      image: 'assets/images/tours/tour7.jpg',
      title: 'Tour Thái Lan 4N3Đ',
      description: 'Bangkok - Pattaya',
      category: 'Du lịch quốc tế',
      destination: 'Thái Lan',
      days: '4 ngày 3 đêm',
      oldPrice: 9900000,
      salePrice: 8490000,
      status: 'Đã hủy',
      views: 432,
    },
    {
      id: 8,
      image: 'assets/images/tours/tour8.jpg',
      title: 'Tour Nha Trang 3N2Đ',
      description: 'Biển xanh - Cát trắng',
      category: 'Du lịch biển',
      destination: 'Nha Trang',
      days: '3 ngày 2 đêm',
      oldPrice: 5200000,
      salePrice: 4250000,
      status: 'Đang mở bán',
      views: 1584,
    },
  ];
  selectedTours = new Set<number>();

  allSelected = false;
  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    this.allSelected = checked;

    this.selectedTours.clear();

    if (checked) {
      this.tours.forEach((tour) => {
        this.selectedTours.add(tour.id);
      });
    }

    this.selectedTours = new Set(this.selectedTours);
  }
  toggleTour(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedTours.add(id);
    } else {
      this.selectedTours.delete(id);
    }

    this.selectedTours = new Set(this.selectedTours);

    this.allSelected = this.selectedTours.size === this.tours.length;
  }
  isSelected(id: number): boolean {
    return this.selectedTours.has(id);
  }
}
