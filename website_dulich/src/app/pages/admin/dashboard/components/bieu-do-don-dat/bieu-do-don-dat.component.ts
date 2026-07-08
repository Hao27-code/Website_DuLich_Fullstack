import { Component, OnInit } from '@angular/core';

interface BookingStatus {
  label: string;
  value: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-bieu-do-don-dat',
  templateUrl: './bieu-do-don-dat.component.html',
  styleUrls: ['./bieu-do-don-dat.component.scss'],
  standalone: true,
})
export class BieuDoDonDatComponent implements OnInit {
  totalBookings = 342;

  statuses: BookingStatus[] = [
    { label: 'Đã xác nhận', value: 152, percent: 44, color: '#35b747' },
    { label: 'Chờ xác nhận', value: 98, percent: 29, color: '#ff9800' },
    { label: 'Đã hủy', value: 42, percent: 12, color: '#ff2d2d' },
    { label: 'Hoàn thành', value: 50, percent: 15, color: '#2d9cff' },
  ];

  constructor() {}

  ngOnInit() {}
}
