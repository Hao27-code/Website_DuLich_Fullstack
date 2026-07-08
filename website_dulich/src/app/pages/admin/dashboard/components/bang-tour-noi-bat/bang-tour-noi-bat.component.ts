import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TopTourRow {
  title: string;
  bookings: number;
  revenue: string;
  imageUrl: string;
}

@Component({
  selector: 'app-bang-tour-noi-bat',
  templateUrl: './bang-tour-noi-bat.component.html',
  styleUrls: ['./bang-tour-noi-bat.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class BangTourNoiBatComponent implements OnInit {
  tours: TopTourRow[] = [
    {
      title: 'Tour Ninh Thuận 3N2Đ',
      bookings: 98,
      revenue: '215.600.000 đ',
      imageUrl: 'assets/images/tours/ninhthuan.jpg',
    },
    {
      title: 'Tour Đà Nẵng - Hội An 4N3Đ',
      bookings: 81,
      revenue: '198.900.000 đ',
      imageUrl: 'assets/images/tours/danang.jpg',
    },
    {
      title: 'Tour Phú Quốc 3N2Đ',
      bookings: 64,
      revenue: '153.600.000 đ',
      imageUrl: 'assets/images/home/gallery_1_4.jpg',
    },
    {
      title: 'Tour Hà Giang 4N3Đ',
      bookings: 56,
      revenue: '142.700.000 đ',
      imageUrl: 'assets/images/tours/hagiang.jpg',
    },
    {
      title: 'Tour Sapa 3N2Đ',
      bookings: 43,
      revenue: '98.700.000 đ',
      imageUrl: 'assets/images/home/gallery_1_6.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
