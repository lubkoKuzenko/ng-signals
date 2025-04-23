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

import { initialLayout } from '../default-layout.config';
import { LayoutItemConfig } from '../resize.interface';
import { ControlEditorComponent } from '../control-editor/control-editor.component';
import { EmptyAreaComponent } from '../empty-area/empty-area.component';
import { AvailableControlsComponent } from '../available-controls-row/available-controls.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ActionConfirmationDialogComponent } from '../../../components/action-confirmation-dialog/action-confirmation-dialog.component';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../../../guards/pending-changes.guard';
import { PendingChangesService } from '../../../services/pending-changes.service';
import { isEqual } from 'lodash';
import { ControlTypesEnum } from '../control-editor/controls.enum';
import { InputComponent } from '../controls/input/input.component';
import { TextAreaComponent } from '../controls/textarea/textarea.component';
import { ButtonComponent } from '../controls/button/button.component';
import { SpanComponent } from '../controls/span/span.component';
import { TextComponent } from '../controls/text/text.component';
import { SourceCodePreviewComponent } from '../source-code-preview/source-code-preview.component';
import { ResultPreviewComponent } from '../result-preview/result-preview.component';

@Component({
  selector: 'app-dnd-rows',
  imports: [
    CommonModule,
    DragDropModule,
    ResizableModule,
    DialogModule,
    CdkDropList,
    CdkDrag,
    ControlEditorComponent,
    ActionConfirmationDialogComponent,
    AvailableControlsComponent,
    SourceCodePreviewComponent,
    ResultPreviewComponent,

    SpanComponent,
    TextComponent,
    InputComponent,
    TextAreaComponent,
    ButtonComponent,
  ],
  providers: [],
  templateUrl: './dnd-rows.component.html',
  styleUrl: './dnd-rows.component.scss',
})
export class DndRowsComponent implements ComponentCanDeactivate {
  dialog = inject(Dialog);
  pendingChangesService = inject(PendingChangesService);
  layoutConfig = signal<LayoutItemConfig[][]>([[]]);
  selectedItem = signal<LayoutItemConfig | null>(null);
  openDialog$: Observable<boolean> = this.pendingChangesService.askForConfirmation$;
  public openSourceDialog = signal<boolean>(false);
  public openViewerDialog = signal<boolean>(false);
  public ControlTypes = ControlTypesEnum;
  private initialLayoutSnapshot = [...initialLayout];
  canDeactivate(): boolean {
    const currentLayout = this.layoutConfig();
    const hasChanges = !isEqual(currentLayout, this.initialLayoutSnapshot);

    return !hasChanges;
  }

  // increaseWidth(e: MouseEvent, id: string, amount: number) {
  //   e.stopPropagation();
  //   const foundElementIndex = this.layoutConfig().findIndex(element => element.id === id);

  //   if (foundElementIndex !== -1) {
  //     const oldElement = this.layoutConfig()[foundElementIndex];
  //     const newWidth = `${parseInt(oldElement.style.width, 10) + amount}%`;
  //     const updatedElement = {
  //       ...oldElement,
  //       style: {
  //         ...oldElement.style,
  //         width: newWidth,
  //       },
  //     };

  //     this.layoutConfig.set([
  //       ...this.layoutConfig().slice(0, foundElementIndex),
  //       updatedElement,
  //       ...this.layoutConfig().slice(foundElementIndex + 1),
  //     ]);
  //   }
  // }

  // decreaseWidth(e: MouseEvent, id: string, amount: number): void {
  //   e.stopPropagation();
  //   const foundElementIndex = this.layoutConfig().findIndex(element => element.id === id);

  //   if (foundElementIndex !== -1) {
  //     const oldElement = this.layoutConfig()[foundElementIndex];
  //     const newWidth = `${Math.max(0, parseInt(oldElement.style.width, 10) - amount)}%`;
  //     const updatedElement = {
  //       ...oldElement,
  //       style: {
  //         ...oldElement.style,
  //         width: newWidth,
  //       },
  //     };

  //     this.layoutConfig.set([
  //       ...this.layoutConfig().slice(0, foundElementIndex),
  //       updatedElement,
  //       ...this.layoutConfig().slice(foundElementIndex + 1),
  //     ]);
  //   }
  // }

  // remove(e: MouseEvent, id: string) {
  //   e.stopPropagation();

  //   this.layoutConfig.update(currentConfig => {
  //     const foundElementIndex = currentConfig.findIndex(item => item.id === id);

  //     if (foundElementIndex > -1) {
  //       const newConfig = [...currentConfig.slice(0, foundElementIndex), ...currentConfig.slice(foundElementIndex + 1)];
  //       return newConfig;
  //     }
  //     return currentConfig;
  //   });

  //   this.selectedItem.update(currentSelectedItem => {
  //     if (currentSelectedItem?.id === id) {
  //       return null;
  //     }
  //     return currentSelectedItem;
  //   });
  // }

  onEditControl(item: LayoutItemConfig) {
    if (item.type === ControlTypesEnum.EMPTY) {
      if (this.selectedItem()) {
        return this.selectedItem.set(null);
      }
      return;
    }

    this.selectedItem.set(item);
  }

  // toggleEditing(id: string, value: boolean) {
  //   const updated = this.layoutConfig().map(item => (item.id === id ? { ...item, isEditing: value } : item));
  //   this.layoutConfig.set(updated);
  // }

  // updateText(value: string, id: string) {
  //   const updated = this.layoutConfig().map(item =>
  //     item.id === id ? { ...item, name: value, isEditing: false } : item,
  //   );

  //   this.layoutConfig.set(updated);

  //   // Close the Edit Control form
  //   if (this.selectedItem()?.id === id) {
  //     this.selectedItem.set(null);
  //   }
  // }

  addRow() {
    this.layoutConfig.update(rows => [...rows, []]);
  }

  drop(event: CdkDragDrop<LayoutItemConfig[], LayoutItemConfig[] | Omit<LayoutItemConfig, 'id'>[]>) {
    console.log(event.container);
    if (event.previousContainer === event.container) {
      this.layoutConfig.update((currentConfig: LayoutItemConfig[][]) => {
        return currentConfig.map((row, index) => {
          if (index === +event.container.id.split('-')[1]) {
            const newRow = [...row];
            moveItemInArray(newRow, event.previousIndex, event.currentIndex);
            return newRow;
          }
          return row;
        });
      });
    } else if (event.container.id === 'new-row-drop-zone') {
      this.dropOnNewRow(event);
    } else {
      if (event.previousContainer.id === 'sidebar') {
        // Copy from sidebar
        const copiedItem: LayoutItemConfig = {
          ...event.previousContainer.data[event.previousIndex],
          id: uuid.v4(),
        };

        this.layoutConfig.update((currentConfig: LayoutItemConfig[][]) => {
          return currentConfig.map((row, index) => {
            if (index === +event.container.id.split('-')[1]) {
              const newRow = [...row];
              newRow.splice(event.currentIndex, 0, copiedItem);
              return newRow;
            }
            return row;
          });
        });
      } else {
        // Move between rows
        this.layoutConfig.update((currentConfig: LayoutItemConfig[][]) => {
          const previousRowIndex = +event.previousContainer.id.split('-')[1];
          const currentRowIndex = +event.container.id.split('-')[1];

          const newConfig = currentConfig.map(row => [...row]); // Create a deep copy

          const [movedItem] = newConfig[previousRowIndex].splice(event.previousIndex, 1);
          newConfig[currentRowIndex].splice(event.currentIndex, 0, movedItem);

          return newConfig;
        });
      }
    }
  }

  dropOnNewRow(event: CdkDragDrop<LayoutItemConfig[], LayoutItemConfig[] | Omit<LayoutItemConfig, 'id'>[]>) {
    if (event.previousContainer.id === 'sidebar') {
      const newItem: LayoutItemConfig = {
        ...event.previousContainer.data[event.previousIndex],
        id: uuid.v4(),
      };
      this.layoutConfig.update(rows => [...rows, [newItem]]);
    } else {
      const previousRowIndex = +event.previousContainer.id.split('-')[1];
      const movedItem = this.layoutConfig()[previousRowIndex][event.previousIndex];
      this.layoutConfig.update(rows => {
        const newRows = rows.map(row => [...row]);
        newRows[previousRowIndex].splice(event.previousIndex, 1);
        newRows.push([movedItem]);
        return newRows;
      });
    }
  }

  getConnectedDropLists(currentIndex: number): string[] {
    return this.layoutConfig()
      .map((_, index) => `row-${index}`)
      .filter(id => id !== `row-${currentIndex}`);
  }

  getAllRowDropListIds(): string[] {
    return this.layoutConfig().map((_, index) => `row-${index}`);
  }

  onConfigurationChanged(newItem: LayoutItemConfig) {
    this.layoutConfig.update(currentConfig => {
      return currentConfig.map(row => row.map(item => (item.id === newItem.id ? newItem : item)));
    });
    this.selectedItem.set(null);
  }

  confirm(): void {
    this.pendingChangesService.confirm();
  }

  cancel(): void {
    this.pendingChangesService.cancel();
  }
}
