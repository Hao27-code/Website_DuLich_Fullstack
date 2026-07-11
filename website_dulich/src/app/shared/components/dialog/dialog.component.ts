import { Component, HostListener, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { IonIcon } from '@ionic/angular/standalone';

import { DialogService } from '../../services/dialog.service';
import { DialogData } from '../../models/dialog.model';
import { close } from 'ionicons/icons';

import { addIcons } from 'ionicons';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor() {
    addIcons({
      close,
    });
  }
  readonly dialogService = inject(DialogService);

  get dialog(): DialogData | null {
    return this.dialogService.currentDialog;
  }

  close(): void {
    this.dialogService.close();
  }

  confirm(): void {
    this.dialog?.onConfirm?.();

    this.close();
  }

  cancel(): void {
    this.dialog?.onCancel?.();

    this.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.dialog?.closeOnEsc === false) {
      return;
    }

    this.close();
  }
}
