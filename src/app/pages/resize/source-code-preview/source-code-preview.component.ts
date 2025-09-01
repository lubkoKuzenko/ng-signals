import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutItemConfig } from '../resize.interface';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
@Component({
  selector: 'app-source-code-preview',
  imports: [NgxJsonViewerModule],
  templateUrl: './source-code-preview.component.html',
  styleUrl: './source-code-preview.component.scss',
})
export class SourceCodePreviewComponent {
  @Input() open = false;
  @Input() layoutConfig: LayoutItemConfig[] | LayoutItemConfig[][] = [];
  @Output() closed = new EventEmitter<boolean>();
}
