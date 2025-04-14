import { Component } from '@angular/core';
import {
  DndDraggableDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndModule,
  DndPlaceholderRefDirective,
} from 'ngx-drag-drop';
import { ResizableModule } from 'angular-resizable-element';

@Component({
  selector: 'app-dnd',
  imports: [ResizableModule],
  templateUrl: './dnd.component.html',
  styleUrl: './dnd.component.scss',
})
export class DndComponent {
  components = [
    { type: 'textfield', icon: '📝', data: { type: 'textfield' } },
    { type: 'button', icon: '🔘', data: { type: 'button' } },
  ];

  layouts: any[] = [];

  onAdd(component: any) {
    this.layouts.push(component);
  }

  removeLayout(layoutIndex: number) {
    this.layouts.splice(layoutIndex, 1);
  }

  onLog() {
    console.log(this.layouts);
  }
}
