import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutItemConfig } from '../resize.interface';
import { ValidationMessageComponent } from '../../../components/validation-message';
import { ControlTypesEnum } from './controls.enum';
import { validatorMap } from './validators.config';

@Component({
  selector: 'app-control-editor',
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './control-editor.component.html',
  styleUrl: './control-editor.component.scss',
})
export class ControlEditorComponent {
  @Input() selectedItem = signal<LayoutItemConfig | null>(null);
  @Output() closed = new EventEmitter<boolean>(false);
  @Output() layoutConfigChange = new EventEmitter<LayoutItemConfig>();

  public ControlTypes = ControlTypesEnum;

  public form!: FormGroup;

  get controls() {
    return this.form.controls;
  }

  constructor() {
    effect(() => {
      this.form = new FormGroup({});

      const currentItem = this.selectedItem();
      if (!currentItem) {
        return;
      }

      this.form.addControl(
        'name',
        new FormControl(currentItem.name, validatorMap.get(currentItem.type) || [Validators.required]),
      );
    });
  }

  public onSubmit() {
    const { name } = this.form.getRawValue();

    const updatedItem: LayoutItemConfig = {
      ...this.selectedItem()!,
      name: name || '',
    };

    this.layoutConfigChange.emit(updatedItem);
  }

  public onClose() {
    this.closed.emit(true);
  }
}
