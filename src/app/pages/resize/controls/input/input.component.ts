import { Component } from '@angular/core';
import { LayoutItemConfig } from '../../resize.interface';
import { BaseControlComponent } from '../base.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent extends BaseControlComponent<LayoutItemConfig> {}
