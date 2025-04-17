import * as uuid from 'uuid';
import { LayoutItemConfig } from './resize.interface';
import { ControlTypesEnum } from './control-editor/controls.enum';

export const initialLayout: LayoutItemConfig[] = [
  {
    id: uuid.v4(),
    name: 'just text',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '100%',
      backgroundColor: '#999',
    },
  },
  {
    id: uuid.v4(),
    name: '<input type="text" />',
    type: ControlTypesEnum.INPUT,
    style: {
      width: '30%',
      backgroundColor: 'blue',
    },
  },
  {
    id: uuid.v4(),
    name: '<input type="text" />',
    type: ControlTypesEnum.INPUT,
    style: {
      width: '40%',
      backgroundColor: 'orange',
    },
  },
  {
    id: uuid.v4(),
    name: '<input type="text" />',
    type: ControlTypesEnum.INPUT,
    style: {
      width: '30%',
      backgroundColor: 'gray',
    },
  },
  {
    id: uuid.v4(),
    name: '<textarea></textarea>',
    type: ControlTypesEnum.TEXTAREA,
    style: {
      width: '40%',
      backgroundColor: 'gray',
    },
  },
  {
    id: uuid.v4(),
    name: '<textarea></textarea>',
    type: ControlTypesEnum.TEXTAREA,
    style: {
      width: '40%',
      backgroundColor: 'green',
    },
  },
  {
    id: uuid.v4(),
    name: 'click',
    type: ControlTypesEnum.BUTTON,
    style: {
      width: '30%',
      backgroundColor: 'blue',
    },
  },
  {
    id: uuid.v4(),
    name: 'empty area',
    type: ControlTypesEnum.EMPTY,
    style: {
      width: '60%',
      backgroundColor: 'orange',
    },
  },
];
