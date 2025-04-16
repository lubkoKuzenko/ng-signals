import { ControlTypesEnum } from './control-editor/controls.enum';
import { LayoutItemConfig } from './resize.interface';

export const controls: Omit<LayoutItemConfig, 'id'>[] = [
  {
    name: 'empty',
    type: ControlTypesEnum.EMPTY,
    style: {
      width: '10%',
      backgroundColor: '#f9f9f9',
    },
  },
  {
    name: 'text',
    type: ControlTypesEnum.TEXTAREA,
    style: {
      width: '100%',
      backgroundColor: 'gainsboro',
    },
  },
  {
    name: 'textfield',
    type: ControlTypesEnum.INPUT,
    style: {
      width: '30%',
      backgroundColor: 'orange',
    },
  },
  {
    name: 'button',
    type: ControlTypesEnum.BUTTON,
    style: {
      width: '30%',
      backgroundColor: 'green',
    },
  },
];
