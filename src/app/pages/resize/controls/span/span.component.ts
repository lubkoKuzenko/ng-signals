import { Component } from '@angular/core';
import { BaseControlComponent } from '../base.component';
import { LayoutItemConfig } from '../../resize.interface';

@Component({
  selector: 'app-span',
  imports: [],
  templateUrl: './span.component.html',
  styleUrl: './span.component.scss',
})
export class SpanComponent extends BaseControlComponent<LayoutItemConfig> {}
