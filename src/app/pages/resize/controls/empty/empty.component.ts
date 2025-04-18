import { Component } from '@angular/core';
import { BaseControlComponent } from '../base.component';
import { LayoutItemConfig } from '../../resize.interface';

@Component({
  selector: 'app-empty',
  imports: [],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent extends BaseControlComponent<LayoutItemConfig> {}
