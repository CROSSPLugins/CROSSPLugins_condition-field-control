import { atom } from 'recoil';
import { FieldControl, FieldControlConfig } from '../../type';
import { v4 as uuidv4 } from 'uuid';

type CustomFieldControl = 
  Pick<FieldControl, 'targetField' | 'controlType'> &
  { id: string } &
  { 
    config: 
      (
        FieldControlConfig & 
        { id: string }
      )[]
  }
;

const fieldControlList = atom<CustomFieldControl[]>({
  key: 'fieldControlList',
  default: [
    {
      targetField: null,
      controlType: 'required',
      id: uuidv4(),
      config: [
        {
          field: 'aaa',
          op: null,
          value: null,
          id: uuidv4()
        }
      ]
    }
  ]
});

export { fieldControlList };