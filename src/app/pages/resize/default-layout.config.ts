import * as uuid from 'uuid';
import { LayoutItemConfig } from './resize.interface';
import { ControlTypesEnum } from './control-editor/controls.enum';

export const initialLayout: LayoutItemConfig[] = [
  {
    id: uuid.v4(),
    name: '1',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '30%',
      backgroundColor: 'blue',
    },
  },
  {
    id: uuid.v4(),
    name: '2',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '40%',
      backgroundColor: 'orange',
    },
  },
  {
    id: uuid.v4(),
    name: '3',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '30%',
      backgroundColor: 'gray',
    },
  },
  {
    id: uuid.v4(),
    name: '4',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '50%',
      backgroundColor: 'gray',
    },
  },
  {
    id: uuid.v4(),
    name: '5',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '40%',
      backgroundColor: 'green',
    },
  },
  {
    id: uuid.v4(),
    name: '6',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '20%',
      backgroundColor: 'blue',
    },
  },
  {
    id: uuid.v4(),
    name: '7',
    type: ControlTypesEnum.TEXT,
    style: {
      width: '60%',
      backgroundColor: 'orange',
    },
  },
];
