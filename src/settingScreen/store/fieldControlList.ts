import { atom } from 'recoil';
import { FieldControl } from '../type';

const fieldControlList = atom<FieldControl[]>({
  key: 'fieldControlList',
  default: []
});

export { fieldControlList };