import { atom } from 'recoil';
import { FieldControl, FieldControlConfig } from '../../type';
import { v4 as uuidv4 } from 'uuid';

type FieldAdditionInfo = {
  fieldError: boolean
  errorText: string
};

export type CustomFieldControl = {
  id: string
  targetField: { value: FieldControl['targetField'] | null } & FieldAdditionInfo
  controlType: { value: FieldControl['controlType'] } & FieldAdditionInfo
  config: {
    id: string
    field: { value: FieldControlConfig['field'] } & FieldAdditionInfo
    op: { value: FieldControlConfig['op'] } & FieldAdditionInfo
    value: { value: FieldControlConfig['value'] } & FieldAdditionInfo
  }[]
};

const fieldControlList = atom<CustomFieldControl[]>({
  key: 'fieldControlList',
  default: [
    {
      id: uuidv4(),
      targetField: { value: null, fieldError: false, errorText: '' },
      controlType: { value: 'required', fieldError: false, errorText: '' },
      config: [
        {
          field: { value: null, fieldError: false, errorText: '' },
          op: { value: null, fieldError: false, errorText: '' },
          value: { value: null, fieldError: false, errorText: '' },
          id: uuidv4()
        }
      ]
    }
  ]
});

export { fieldControlList };