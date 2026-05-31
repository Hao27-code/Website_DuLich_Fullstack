import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePipe, DecimalPipe } from '@angular/common';
import { IonDatetime } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
  imports: [DecimalPipe, IonDatetime, DatePipe, FormsModule, CommonModule],
})
export class BookingModalComponent {
  selectedDate = new Date().toISOString();
  @Input() tour: any;

  step = 1;

  adultQty = 1;
  childQty = 0;

  constructor(private modalCtrl: ModalController) {}

  nextStep() {
    this.step = 2;
  }

  backStep() {
    this.step = 1;
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
