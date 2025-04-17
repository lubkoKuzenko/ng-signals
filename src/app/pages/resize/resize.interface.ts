import { ControlTypesEnum } from './control-editor/controls.enum';

export interface LayoutItemConfig {
  id: string;
  isEditing?: boolean;
  name: string;
  type: ControlTypesEnum;
  style: {
    width: string;
    backgroundColor?: string;
  };
  buttonStyle?: {
    backgroundColor?: string;
    paddingX?: string;
    paddingY?: string;
  };
}
