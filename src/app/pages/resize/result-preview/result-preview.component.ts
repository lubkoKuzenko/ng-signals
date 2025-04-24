import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutItemConfig } from '../resize.interface';
import { ViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-result-preview',
  imports: [ViewerComponent],
  templateUrl: './result-preview.component.html',
  styleUrl: './result-preview.component.scss',
})
export class ResultPreviewComponent {
  @Input() open = false;
  @Input() layoutConfig: LayoutItemConfig[][] = [[]];
  @Output() closed = new EventEmitter<boolean>();

  constructor() {
    console.log(this.layoutConfig);
  }
}
