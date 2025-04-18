import { Directive, Input } from '@angular/core';
import { LayoutItemConfig } from '../resize.interface';

@Directive()
export abstract class BaseControlComponent<T = LayoutItemConfig> {
  @Input()
  public control!: T;
}
