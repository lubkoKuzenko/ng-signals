import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ResizableModule } from 'angular-resizable-element';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  DragDropModule,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import * as uuid from 'uuid';

import { initialLayout } from './default-layout.config';
import { LayoutItemConfig } from './resize.interface';
import { ControlEditorComponent } from './control-editor/control-editor.component';
import { EmptyAreaComponent } from './empty-area/empty-area.component';
import { AvailableControlsComponent } from './available-controls/available-controls.component';
import { DialogRef, Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { ActionConfirmationDialogComponent } from '../../components/action-confirmation-dialog/action-confirmation-dialog.component';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../../guards/pending-changes.guard';
import { PendingChangesService } from '../../services/pending-changes.service';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-resize',
  imports: [
    CommonModule,
    DragDropModule,
    ResizableModule,
    DialogModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    ControlEditorComponent,
    EmptyAreaComponent,
    ActionConfirmationDialogComponent,
    AvailableControlsComponent,
  ],
  providers: [
    { provide: DIALOG_DATA, useValue: { some: 'data' } }, // Provide a value
    { provide: DialogRef, useValue: {} },
  ],
  templateUrl: './resize.component.html',
  styleUrl: './resize.component.scss',
})
export class ResizeComponent implements ComponentCanDeactivate {
  dialog = inject(Dialog);
  pendingChangesService = inject(PendingChangesService);
  layoutConfig = signal<LayoutItemConfig[]>(initialLayout);
  selectedItem = signal<LayoutItemConfig | null>(null);
  openDialog$: Observable<boolean> = this.pendingChangesService.askForConfirmation$;

  private initialLayoutSnapshot = [...initialLayout];
  canDeactivate(): boolean {
    const currentLayout = this.layoutConfig();
    const hasChanges = !isEqual(currentLayout, this.initialLayoutSnapshot);

    return !hasChanges;
  }

  increaseWidth(e: MouseEvent, id: string, amount: number) {
    e.stopPropagation();
    const foundElementIndex = this.layoutConfig().findIndex(element => element.id === id);

    if (foundElementIndex !== -1) {
      const oldElement = this.layoutConfig()[foundElementIndex];
      const newWidth = `${parseInt(oldElement.style.width, 10) + amount}%`;
      const updatedElement = {
        ...oldElement,
        style: {
          ...oldElement.style,
          width: newWidth,
        },
      };

      this.layoutConfig.set([
        ...this.layoutConfig().slice(0, foundElementIndex),
        updatedElement,
        ...this.layoutConfig().slice(foundElementIndex + 1),
      ]);
    }
  }

  decreaseWidth(e: MouseEvent, id: string, amount: number): void {
    e.stopPropagation();
    const foundElementIndex = this.layoutConfig().findIndex(element => element.id === id);

    if (foundElementIndex !== -1) {
      const oldElement = this.layoutConfig()[foundElementIndex];
      const newWidth = `${Math.max(0, parseInt(oldElement.style.width, 10) - amount)}%`;
      const updatedElement = {
        ...oldElement,
        style: {
          ...oldElement.style,
          width: newWidth,
        },
      };

      this.layoutConfig.set([
        ...this.layoutConfig().slice(0, foundElementIndex),
        updatedElement,
        ...this.layoutConfig().slice(foundElementIndex + 1),
      ]);
    }
  }

  remove(e: MouseEvent, id: string) {
    e.stopPropagation();
    const foundElementIndex = this.layoutConfig().findIndex(item => item.id === id);
    const selectedElementIndex = this.layoutConfig().findIndex(item => item.id === this.selectedItem()?.id);

    if (foundElementIndex > -1) {
      this.layoutConfig().splice(foundElementIndex, 1);
    }

    // If the removed element was selected, deselect it
    if (selectedElementIndex === foundElementIndex) {
      this.selectedItem.set(null);
    }
  }

  drop(event: CdkDragDrop<LayoutItemConfig[]>) {
    if (event.previousContainer === event.container) {
      // Reordering inside the same container
      moveItemInArray(this.layoutConfig(), event.previousIndex, event.currentIndex);
    } else {
      // Copy item from sidebar to layoutConfig
      const copiedItem = {
        ...event.previousContainer.data[event.previousIndex],
      };
      this.layoutConfig().splice(event.currentIndex, 0, {
        ...copiedItem,
        id: uuid.v4(),
      });
    }
  }

  onEditControl(item: LayoutItemConfig) {
    this.selectedItem.set(item);
  }

  onConfigurationChanged(newItem: LayoutItemConfig) {
    this.layoutConfig.set(this.layoutConfig().map(item => (item.id === newItem.id ? newItem : item)));
  }

  confirm(): void {
    this.pendingChangesService.confirm();
  }

  cancel(): void {
    this.pendingChangesService.cancel();
  }
}
