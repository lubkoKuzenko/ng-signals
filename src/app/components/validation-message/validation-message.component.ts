import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormatErrorMessagePipe } from './format-error-message.pipe';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bb-validation-message',
  imports: [KeyValuePipe, FormatErrorMessagePipe],
  styleUrls: ['validation-message.component.scss'],
  templateUrl: 'validation-message.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ValidationMessageComponent {
  @Input({ required: true })
  public control!: AbstractControl;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get errors(): Record<string, any> {
    return this.control.errors || {};
  }
}
