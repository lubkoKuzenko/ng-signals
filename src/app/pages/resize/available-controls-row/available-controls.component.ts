import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { controls } from '../controls';
import { CommonModule } from '@angular/common';
import { ControlTypesEnum } from '../control-editor/controls.enum';
import { LayoutItemConfig } from '../resize.interface';

@Component({
  selector: 'app-available-controls-row',
  imports: [CommonModule, DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './available-controls.component.html',
  styleUrl: './available-controls.component.scss',
})
export class AvailableControlsComponent implements OnChanges {
  @Input() public layoutConfig: LayoutItemConfig[][] = [[]];

  controls = signal(controls.filter(control => control.type !== ControlTypesEnum.EMPTY));
  public ControlTypes = ControlTypesEnum;

  connectedDropLists: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['layoutConfig']) {
      this.updateConnectedDropLists();
    }
  }

  updateConnectedDropLists(): void {
    this.connectedDropLists = this.layoutConfig.map((_, index) => 'row-' + index).concat(['new-row-drop-zone']); // Або змінити логіку, якщо треба по-іншому
  }
}
