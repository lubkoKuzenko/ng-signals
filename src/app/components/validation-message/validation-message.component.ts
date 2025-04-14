import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormatErrorMessagePipe } from './format-error-message.pipe';

@Component({
  selector: 'bb-validation-message',
  imports: [KeyValuePipe, FormatErrorMessagePipe],
  styleUrls: ['validation-message.component.scss'],
  templateUrl: 'validation-message.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ValidationMessageComponent {
  @Input({ required: true })
  public control!: AbstractControl;

  get errors(): { [key: string]: any } {
    return this.control.errors || {};
  }
}
