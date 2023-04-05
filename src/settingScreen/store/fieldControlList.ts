import { atom } from 'recoil';
import { NOCONDITION } from '../../const';
import { FieldControl } from '../../type';

const fieldControlList = atom<FieldControl[]>({
  key: 'fieldControlList',
  default: [
    {
      targetField: null,
      controlType: 'required',
      config: [
        {
          field: NOCONDITION,
          op: null,
          value: null
        }
      ]
    }
  ]
});

export { fieldControlList };