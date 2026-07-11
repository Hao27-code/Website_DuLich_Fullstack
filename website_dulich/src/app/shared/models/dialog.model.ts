export type DialogType =
  | 'success'
  | 'warning'
  | 'error'
  | 'confirm'
  | 'loading';

export interface DialogData {
  title: string;

  message: string;

  type: DialogType;

  confirmText?: string;

  cancelText?: string;

  showCancel?: boolean;

  closeOnBackdrop?: boolean;

  closeOnEsc?: boolean;

  onConfirm?: () => void;

  onCancel?: () => void;
}
