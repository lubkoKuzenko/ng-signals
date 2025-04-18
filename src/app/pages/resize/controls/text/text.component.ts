import { Component, EventEmitter, Output } from '@angular/core';
import { BaseControlComponent } from '../base.component';
import { LayoutItemConfig } from '../../resize.interface';
import { CommonModule } from '@angular/common';
import { ControlTypesEnum } from '../../control-editor/controls.enum';

@Component({
  selector: 'app-text',
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent extends BaseControlComponent<LayoutItemConfig> {
  @Output() public toggleEditing = new EventEmitter<{ id: string; value: boolean }>();
  @Output() public updateText = new EventEmitter<{ value: string; id: string }>();

  public ControlTypes = ControlTypesEnum;
}
