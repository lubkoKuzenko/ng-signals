import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-confirmation-dialog',
  templateUrl: './action-confirmation-dialog.component.html',
  styleUrl: './action-confirmation-dialog.component.scss',
})
export class ActionConfirmationDialogComponent {
  @Input() open = false;
  @Input() confirmationMessage = 'Are you sure?';
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() cancelled = new EventEmitter<boolean>();

  onConfirm(): void {
    this.confirmed.emit(true);
  }

  onCancel(): void {
    this.cancelled.emit(false);
  }
}
