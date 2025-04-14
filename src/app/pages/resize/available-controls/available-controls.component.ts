import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, signal } from '@angular/core';
import { controls } from '../controls';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'available-controls',
  imports: [CommonModule, DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './available-controls.component.html',
  styleUrl: './available-controls.component.scss',
})
export class AvailableControlsComponent {
  controls = signal(controls);
}
