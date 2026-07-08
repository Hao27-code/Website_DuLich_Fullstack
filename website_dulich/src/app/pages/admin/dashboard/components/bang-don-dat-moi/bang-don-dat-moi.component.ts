import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LatestBookingRow {
  id: string;
  customerName: string;
  tourName: string;
  bookingDate: string;
  status: string;
  statusClass: string;
  totalPrice: string;
}

@Component({
  selector: 'app-bang-don-dat-moi',
  templateUrl: './bang-don-dat-moi.component.html',
  styleUrls: ['./bang-don-dat-moi.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class BangDonDatMoiComponent implements OnInit {
  bookings: LatestBookingRow[] = [
    {
      id: '#3421',
      customerName: 'Nguyễn Văn A',
      tourName: 'Tour Ninh Thuận 3N2Đ',
      bookingDate: '31/05/2024',
      status: 'Chờ xác nhận',
      statusClass: 'pending',
      totalPrice: '5.200.000 đ',
    },
    {
      id: '#3420',
      customerName: 'Trần Thị B',
      tourName: 'Tour Đà Nẵng - Hội An 4N3Đ',
      bookingDate: '31/05/2024',
      status: 'Đã xác nhận',
      statusClass: 'confirmed',
      totalPrice: '6.490.000 đ',
    },
    {
      id: '#3419',
      customerName: 'Lê Văn C',
      tourName: 'Tour Phú Quốc 3N2Đ',
      bookingDate: '30/05/2024',
      status: 'Chờ xác nhận',
      statusClass: 'pending',
      totalPrice: '4.990.000 đ',
    },
    {
      id: '#3418',
      customerName: 'Phạm Thị D',
      tourName: 'Tour Hà Giang 4N3Đ',
      bookingDate: '30/05/2024',
      status: 'Đã hủy',
      statusClass: 'cancelled',
      totalPrice: '5.900.000 đ',
    },
    {
      id: '#3417',
      customerName: 'Hoàng Văn E',
      tourName: 'Tour Sapa 3N2Đ',
      bookingDate: '29/05/2024',
      status: 'Hoàn thành',
      statusClass: 'completed',
      totalPrice: '4.500.000 đ',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
