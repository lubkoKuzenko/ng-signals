import * as uuid from 'uuid';
import { LayoutItemConfig } from './resize.interface';
import { ControlTypesEnum } from './control-editor/controls.enum';

export const initialLayout: LayoutItemConfig[][] = [
  [
    {
      id: uuid.v4(),
      name: 'Text',
      type: ControlTypesEnum.TEXT,
      style: {
        width: '100%',
        backgroundColor: '#999',
      },
      validators: {
        required: true,
      },
    },
  ],
  [
    {
      id: uuid.v4(),
      name: 'Label',
      type: ControlTypesEnum.INPUT,
      style: {
        width: '30%',
        backgroundColor: 'blue',
      },
      validators: {
        required: false,
      },
    },
    {
      id: uuid.v4(),
      name: 'Label',
      type: ControlTypesEnum.INPUT,
      style: {
        width: '40%',
        backgroundColor: 'orange',
      },
      validators: {
        required: false,
      },
    },
    {
      id: uuid.v4(),
      name: 'Label',
      type: ControlTypesEnum.INPUT,
      style: {
        width: '30%',
        backgroundColor: 'gray',
      },
      validators: {
        required: false,
      },
    },
  ],
  [
    {
      id: uuid.v4(),
      name: 'Label',
      type: ControlTypesEnum.TEXTAREA,
      style: {
        width: '40%',
        backgroundColor: 'gray',
      },
      validators: {
        required: false,
      },
    },
    {
      id: uuid.v4(),
      name: 'Label',
      type: ControlTypesEnum.TEXTAREA,
      style: {
        width: '40%',
        backgroundColor: 'green',
      },
      validators: {
        required: false,
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
      validators: {
        required: false,
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
      validators: {
        required: false,
      },
    },
  ],
];
