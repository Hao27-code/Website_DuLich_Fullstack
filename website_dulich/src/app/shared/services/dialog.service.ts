import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DialogData } from '../models/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialogSubject = new BehaviorSubject<DialogData | null>(null);

  readonly dialog$ = this.dialogSubject.asObservable();

  get currentDialog(): DialogData | null {
    return this.dialogSubject.value;
  }

  open(dialog: DialogData): void {
    this.dialogSubject.next(dialog);
  }

  close(): void {
    this.dialogSubject.next(null);
  }

  success(title: string, message: string): void {
    this.open({
      title,

      message,

      type: 'success',

      confirmText: 'OK',
    });
  }

  warning(title: string, message: string): void {
    this.open({
      title,

      message,

      type: 'warning',

      confirmText: 'Đóng',
    });
  }

  error(title: string, message: string): void {
    this.open({
      title,

      message,

      type: 'error',

      confirmText: 'Đóng',
    });
  }

  loading(title = 'Đang xử lý', message = 'Vui lòng chờ...'): void {
    this.open({
      title,

      message,

      type: 'loading',

      closeOnBackdrop: false,

      closeOnEsc: false,
    });
  }

  confirm(options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }): void {
    this.open({
      type: 'confirm',

      showCancel: true,

      closeOnBackdrop: false,

      closeOnEsc: false,

      confirmText: options.confirmText ?? 'Đồng ý',

      cancelText: options.cancelText ?? 'Hủy',

      title: options.title,

      message: options.message,

      onConfirm: options.onConfirm,

      onCancel: options.onCancel,
    });
  }
}
