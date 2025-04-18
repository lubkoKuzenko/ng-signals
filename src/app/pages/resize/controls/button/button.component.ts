import { Component } from '@angular/core';
import { BaseControlComponent } from '../base.component';
import { LayoutItemConfig } from '../../resize.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent extends BaseControlComponent<LayoutItemConfig> {
  ngOnInit() {
    console.log(this.control);
  }
}
