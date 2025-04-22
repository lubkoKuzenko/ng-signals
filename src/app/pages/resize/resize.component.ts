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
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ActionConfirmationDialogComponent } from '../../components/action-confirmation-dialog/action-confirmation-dialog.component';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../../guards/pending-changes.guard';
import { PendingChangesService } from '../../services/pending-changes.service';
import { isEqual } from 'lodash';
import { ControlTypesEnum } from './control-editor/controls.enum';
import { InputComponent } from './controls/input/input.component';
import { TextAreaComponent } from './controls/textarea/textarea.component';
import { ButtonComponent } from './controls/button/button.component';
import { SpanComponent } from './controls/span/span.component';
import { TextComponent } from './controls/text/text.component';
import { SourceCodePreviewComponent } from './source-code-preview/source-code-preview.component';
import { ResultPreviewComponent } from './result-preview/result-preview.component';

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
    SourceCodePreviewComponent,
    ResultPreviewComponent,

    SpanComponent,
    TextComponent,
    InputComponent,
    TextAreaComponent,
    ButtonComponent,
  ],
  providers: [],
  templateUrl: './resize.component.html',
  styleUrl: './resize.component.scss',
})
export class ResizeComponent implements ComponentCanDeactivate {
  dialog = inject(Dialog);
  pendingChangesService = inject(PendingChangesService);
  layoutConfig = signal<LayoutItemConfig[]>(initialLayout);
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

    this.layoutConfig.update(currentConfig => {
      const foundElementIndex = currentConfig.findIndex(item => item.id === id);

      if (foundElementIndex > -1) {
        const newConfig = [...currentConfig.slice(0, foundElementIndex), ...currentConfig.slice(foundElementIndex + 1)];
        return newConfig;
      }
      return currentConfig;
    });

    this.selectedItem.update(currentSelectedItem => {
      if (currentSelectedItem?.id === id) {
        return null;
      }
      return currentSelectedItem;
    });
  }

  drop(event: CdkDragDrop<LayoutItemConfig[]>) {
    if (event.previousContainer === event.container) {
      // Reordering inside the same container
      this.layoutConfig.update((currentConfig: LayoutItemConfig[]) => {
        const newConfig = [...currentConfig];
        moveItemInArray(newConfig, event.previousIndex, event.currentIndex);
        return newConfig;
      });
    } else {
      // Copy item from sidebar to layoutConfig
      const copiedItem = {
        ...event.previousContainer.data[event.previousIndex],
      };
      this.layoutConfig.update((currentConfig: LayoutItemConfig[]) => [
        ...currentConfig.slice(0, event.currentIndex),
        {
          ...copiedItem,
          id: uuid.v4(),
          name:
            copiedItem.type === ControlTypesEnum.TEXT
              ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisl risus, eleifend vitae congue in, accumsan in nibh.'
              : copiedItem.name,
        },
        ...currentConfig.slice(event.currentIndex),
      ]);
    }
  }

  onEditControl(item: LayoutItemConfig) {
    if (item.type === ControlTypesEnum.EMPTY) {
      if (this.selectedItem()) {
        return this.selectedItem.set(null);
      }
      return;
    }

    this.selectedItem.set(item);
  }

  toggleEditing(id: string, value: boolean) {
    const updated = this.layoutConfig().map(item => (item.id === id ? { ...item, isEditing: value } : item));
    this.layoutConfig.set(updated);
  }

  updateText(value: string, id: string) {
    const updated = this.layoutConfig().map(item =>
      item.id === id ? { ...item, name: value, isEditing: false } : item,
    );

    this.layoutConfig.set(updated);

    // Close the Edit Control form
    if (this.selectedItem()?.id === id) {
      this.selectedItem.set(null);
    }
  }

  onConfigurationChanged(newItem: LayoutItemConfig) {
    this.layoutConfig.set(this.layoutConfig().map(item => (item.id === newItem.id ? newItem : item)));
    this.selectedItem.set(null);
  }

  confirm(): void {
    this.pendingChangesService.confirm();
  }

  cancel(): void {
    this.pendingChangesService.cancel();
  }
}
