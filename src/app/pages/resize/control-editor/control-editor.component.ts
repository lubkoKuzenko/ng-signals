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

      if (currentItem.type === ControlTypesEnum.BUTTON) {
        const style = currentItem.buttonStyle || {};

        this.form.addControl(
          'backgroundColor',
          new FormControl(style?.backgroundColor || '#3b82f6'), // Default Tailwind blue-500
        );
        this.form.addControl('paddingX', new FormControl(style.paddingX || '16'));
        this.form.addControl('paddingY', new FormControl(style.paddingY || '8'));
      }
    });
  }

  public onSubmit() {
    const { name, backgroundColor, paddingX, paddingY } = this.form.getRawValue();
    const currentItem = this.selectedItem();

    const updatedItem: LayoutItemConfig = {
      ...currentItem!,
      name: name || '',
      ...(currentItem?.type === ControlTypesEnum.BUTTON
        ? {
            buttonStyle: {
              ...currentItem?.buttonStyle,
              backgroundColor,
              paddingX,
              paddingY,
            },
          }
        : {}),
    };

    this.layoutConfigChange.emit(updatedItem);
  }

  public onClose() {
    this.closed.emit(true);
  }
}
