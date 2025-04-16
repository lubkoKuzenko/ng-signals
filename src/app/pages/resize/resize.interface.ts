import { ControlTypesEnum } from './control-editor/controls.enum';

export interface LayoutItemConfig {
  id: string;
  name: string;
  type: ControlTypesEnum;
  style: {
    width: string;
    backgroundColor?: string;
  };
}
