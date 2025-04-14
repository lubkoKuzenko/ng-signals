import * as uuid from 'uuid';
import { LayoutItemConfig } from './resize.interface';

export const initialLayout: LayoutItemConfig[] = [
  {
    id: uuid.v4(),
    name: '1',
    style: {
      width: '30%',
      backgroundColor: 'blue',
    },
  },
  {
    id: uuid.v4(),
    name: '2',
    style: {
      width: '40%',
      backgroundColor: 'orange',
    },
  },
  {
    id: uuid.v4(),
    name: '3',
    style: {
      width: '30%',
      backgroundColor: 'gray',
    },
  },
  {
    id: uuid.v4(),
    name: '4',
    style: {
      width: '50%',
      backgroundColor: 'gray',
    },
  },
  {
    id: uuid.v4(),
    name: '5',
    style: {
      width: '40%',
      backgroundColor: 'green',
    },
  },
  {
    id: uuid.v4(),
    name: '6',
    style: {
      width: '20%',
      backgroundColor: 'blue',
    },
  },
  {
    id: uuid.v4(),
    name: '7',
    style: {
      width: '60%',
      backgroundColor: 'orange',
    },
  },
];
