import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutItemConfig } from '../resize.interface';
import { ValidationMessageComponent } from '../../../components/validation-message';

@Component({
  selector: 'control-editor',
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './control-editor.component.html',
  styleUrl: './control-editor.component.scss',
})
export class ControlEditorComponent {
  @Input() selectedItem = signal<LayoutItemConfig | null>(null);
  @Output() layoutConfigChange = new EventEmitter<LayoutItemConfig>();

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(3)]),
  });

  get controls() {
    return this.form.controls;
  }

  constructor() {
    effect(() => {
      const currentItem = this.selectedItem();
      if (currentItem) {
        this.form.patchValue({ name: currentItem.name });
      } else {
        this.form.reset();
      }
    });
  }

  public onSubmit() {
    const { name } = this.form.getRawValue();

    const updatedItem: LayoutItemConfig = { ...this.selectedItem()!, name: name || '' };

    this.layoutConfigChange.emit(updatedItem);
  }
}
