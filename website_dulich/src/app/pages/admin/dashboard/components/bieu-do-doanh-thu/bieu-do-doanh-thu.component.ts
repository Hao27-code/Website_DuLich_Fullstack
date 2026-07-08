import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, caretUpOutline } from 'ionicons/icons';
interface RevenuePoint {
  label: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-bieu-do-doanh-thu',
  templateUrl: './bieu-do-doanh-thu.component.html',
  styleUrls: ['./bieu-do-doanh-thu.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class BieuDoDoanhThuComponent implements OnInit {
  chartPoints: RevenuePoint[] = [
    { label: '01/05', x: 0, y: 170 },
    { label: '', x: 50, y: 160 },
    { label: '06/05', x: 100, y: 138 },
    { label: '', x: 150, y: 140 },
    { label: '11/05', x: 200, y: 90 },
    { label: '', x: 250, y: 112 },
    { label: '16/05', x: 300, y: 136 },
    { label: '', x: 350, y: 96 },
    { label: '21/05', x: 400, y: 72 },
    { label: '', x: 430, y: 66 },
    { label: '26/05', x: 465, y: 118 },
    { label: '', x: 505, y: 90 },
    { label: '31/05', x: 550, y: 66 },
  ];

  linePoints = this.chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(' ');
  areaPoints = `0,190 ${this.linePoints} 550,190`;

  constructor() {
    addIcons({
      chevronDownOutline,
      caretUpOutline,
    });
  }

  ngOnInit() {}
}
