import { Component } from '@angular/core';
import {
  DndDraggableDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndModule,
  DndPlaceholderRefDirective,
} from 'ngx-drag-drop';

@Component({
  selector: 'app-dnd',
  imports: [DndModule, DndPlaceholderRefDirective, DndDraggableDirective, DndDropzoneDirective],
  templateUrl: './dnd.component.html',
  styleUrl: './dnd.component.scss',
})
export class DndComponent {
  components = [
    { type: 'layout', icon: '🧱', data: { type: 'layout', zones: [[]] } },
    { type: 'layout', icon: '🧱2', data: { type: 'layout', zones: [[], []] } },
    {
      type: 'layout',
      icon: '🧱3',
      data: { type: 'layout', zones: [[], [], []] },
    },
    { type: 'textfield', icon: '📝', data: { type: 'textfield' } },
    { type: 'button', icon: '🔘', data: { type: 'button' } },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layouts: any[] = [];

  onDropLayout(event: DndDropEvent, dropIndex: number | null = null) {
    const isLayout = event.data.type === 'layout';
    const index = dropIndex ?? this.layouts.length;

    if (isLayout) {
      // Add a new layout
      this.layouts.splice(dropIndex || 0, 0, event.data);
    } else {
      this.layouts.splice(index, 0, { type: 'layout', zones: [[]] });
      this.insertElement(event, index, 0);
    }
  }

  onDropControl(event: DndDropEvent, layoutIndex: number, zoneIndex: number) {
    const currentLayout = this.layouts[layoutIndex];
    const currentElement = currentLayout.zones[zoneIndex];

    if (currentLayout && currentElement.length === 0) {
      this.insertElement(event, layoutIndex, zoneIndex);
    }
  }

  insertElement(event: DndDropEvent, layoutIndex: number, zoneIndex: number) {
    const currentLayout = this.layouts[layoutIndex];
    const currentElement = currentLayout.zones[zoneIndex];
    const dropIndex = event.index !== undefined ? event.index : currentLayout.zones[zoneIndex].length;

    if (currentLayout && currentElement) {
      currentElement.splice(dropIndex, 0, event.data);
    }
  }

  removeLayout(layoutIndex: number) {
    this.layouts.splice(layoutIndex, 1);
  }

  onEditControl(layoutIndex: number, zoneIndex: number) {
    const currentLayout = this.layouts[layoutIndex];
    const currentElement = currentLayout.zones[zoneIndex];

    console.log(currentElement);
  }
}
