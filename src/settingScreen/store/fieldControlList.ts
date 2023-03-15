import { atom } from 'recoil';
import { FieldControl } from '../type';

const fieldControlList = atom<FieldControl[]>({
  key: 'fieldControlList',
  default: [
    {
      targetField: null,
      controlType: 'required',
      config: [
        {
          field: null,
          op: null,
          value: null
        }
      ]
    }
  ]
});

export { fieldControlList };