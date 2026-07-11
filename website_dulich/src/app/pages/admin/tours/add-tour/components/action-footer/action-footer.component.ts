import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-action-footer',
  templateUrl: './action-footer.component.html',
  styleUrls: ['./action-footer.component.scss'],
  standalone: true,
})
export class ActionFooterComponent {
  @Input() loading = false;

  @Output() save = new EventEmitter<void>();

  @Output() cancelClicked = new EventEmitter<void>();

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.cancelClicked.emit();
  }
}
