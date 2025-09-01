import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
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

  // 2D array: each entry is one row of controls
  layoutConfig = signal<LayoutItemConfig[][]>(initialLayout);

  newRowData: LayoutItemConfig[] = [];

  // All CDK drop-list IDs
  dropListIds = computed(() =>
    this.layoutConfig()
      .map((_, i) => `row-${i}`)
      .concat('new-row'),
  );

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

    this.layoutConfig.update(rs =>
      rs.map(row =>
        row.map(item => {
          if (item.id !== id) return item;

          // item.style.width is e.g. "20%"
          const n = parseFloat(item.style.width as string) + amount;

          return {
            ...item,
            style: { ...item.style, width: `${n}%` },
          };
        }),
      ),
    );
  }

  decreaseWidth(e: MouseEvent, id: string, amount: number): void {
    e.stopPropagation();
    this.layoutConfig.update(rs =>
      rs.map(row =>
        row.map(item => {
          if (item.id !== id) return item;

          const n = Math.max(0, parseFloat(item.style.width as string) - amount);

          return {
            ...item,
            style: { ...item.style, width: `${n}%` },
          };
        }),
      ),
    );
  }

  remove(e: MouseEvent, id: string) {
    e.stopPropagation();

    // Update the layout (remove the item)
    this.layoutConfig.update(rows => rows.map(r => r.filter(c => c.id !== id)).filter(r => r.length > 0));

    // If that control was open in the editor, close it
    if (this.selectedItem()?.id === id) {
      this.selectedItem.set(null);
    }
  }

  // Drop inside existing rows
  drop(event: CdkDragDrop<LayoutItemConfig[]>, rowIndex: number) {
    this.layoutConfig.update(cur => {
      const rows = cur.map(r => [...r]);
      const fromId = event.previousContainer.id;
      const toId = event.container.id;

      // same-row reorder
      if (fromId === toId) {
        moveItemInArray(rows[rowIndex], event.previousIndex, event.currentIndex);

        // row → row transfer
      } else if (fromId.startsWith('row-') && toId.startsWith('row-')) {
        const fromIdx = +fromId.replace('row-', '');
        const [moved] = rows[fromIdx].splice(event.previousIndex, 1);
        rows[rowIndex].splice(event.currentIndex, 0, moved);

        // Sidebar with available controls → row
      } else if (fromId === 'sidebar') {
        const originalConfig = event.item.data as LayoutItemConfig;
        const initialName =
          originalConfig.type === ControlTypesEnum.TEXT
            ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisl risus, eleifend vitae congue in, accumsan in nibh.'
            : originalConfig.name;
        const newCtrl: LayoutItemConfig = {
          ...originalConfig,
          id: uuid.v4(),
          name: initialName,
        };

        rows[rowIndex].splice(event.currentIndex, 0, newCtrl);

        // new-row → row
      } else if (fromId === 'new-row') {
        const last = rows.length - 1;
        const [moved] = rows[last].splice(event.previousIndex, 1);
        rows[rowIndex].splice(event.currentIndex, 0, moved);
      }

      // Drop any empty rows (e.g. if the only item is removed)
      return rows.filter(r => r.length > 0);
    });
  }

  // Drop into the "create a new row" zone
  onDropToNewRow(event: CdkDragDrop<LayoutItemConfig[]>) {
    this.layoutConfig.update(cur => {
      const rows = cur.map(r => [...r]);
      const fromId = event.previousContainer.id;

      if (fromId.startsWith('row-')) {
        const fromIdx = +fromId.replace('row-', '');
        const [moved] = rows[fromIdx].splice(event.previousIndex, 1);
        rows.push([moved]);
      } else if (fromId === 'sidebar') {
        const original = event.item.data as LayoutItemConfig;
        const initialName =
          original.type === ControlTypesEnum.TEXT
            ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisl risus, eleifend vitae congue in, accumsan in nibh.'
            : original.name;
        const newCtrl: LayoutItemConfig = {
          ...original,
          id: uuid.v4(),
          name: initialName,
        };

        // Push into its own new row
        rows.push([newCtrl]);
      }

      return rows.filter(r => r.length > 0);
    });
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

  // Flip on/off the inline edit mode
  toggleEditing(id: string, isEditing: boolean) {
    this.layoutConfig.update(rows =>
      rows.map(row => row.map(ctrl => (ctrl.id === id ? { ...ctrl, isEditing } : ctrl))),
    );
  }

  updateText(newValue: string, id: string) {
    this.layoutConfig.update(rows =>
      rows.map(row => row.map(ctrl => (ctrl.id === id ? { ...ctrl, name: newValue, isEditing: false } : ctrl))),
    );
  }

  onConfigurationChanged(newItem: LayoutItemConfig) {
    this.layoutConfig.update(rs => rs.map(row => row.map(item => (item.id === newItem.id ? newItem : item))));

    // Close the editor
    this.selectedItem.set(null);
  }

  confirm(): void {
    this.pendingChangesService.confirm();
  }

  cancel(): void {
    this.pendingChangesService.cancel();
  }
}
