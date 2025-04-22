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
  validators: {
    required?: boolean;
    min?: number;
    max?: number;
  };
  buttonStyle?: {
    backgroundColor?: string;
    paddingX?: string;
    paddingY?: string;
  };
}
