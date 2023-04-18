import React from 'react';
import { useState, createContext } from 'react';
import { useRecoilValue } from 'recoil';
import { fieldControlList } from '../store';
import { FormFieldsInfo } from '../../type';
import ControlConditionField from './ControlConditionField';
import ControlCondtionOperator from './ControlCondtionOperator';
import ControlConditionValueForm from './ControlConditionValueForm';

export const ControlConditionContext = createContext({} as {
  listIndex: number
  configIndex: number
  formFieldsInfo: FormFieldsInfo[]
  fieldType: string | null
  setFieldType: React.Dispatch<React.SetStateAction<string | null>>
  isFirst: boolean
});

export default (props: {
  listIndex: number
  configIndex: number
  formFieldsInfo: FormFieldsInfo[]
  isFirst: boolean
}) => {
  const list = useRecoilValue(fieldControlList);
  const [fieldType, setFieldType] = useState(() => {
    if(list[props.listIndex].config[props.configIndex].field.value) {
      const result = props.formFieldsInfo.filter(e => e.code === list[props.listIndex].config[props.configIndex].field.value);
      if(result.length) {
        return result[0].type;
      } else {
        return null;
      }
    } else {
      return null;
    }
  });

  return (
    <ControlConditionContext.Provider 
      value={{ 
        listIndex: props.listIndex,
        configIndex: props.configIndex,
        formFieldsInfo: props.formFieldsInfo,
        fieldType,
        setFieldType,
        isFirst: props.isFirst
      }}>
      <td>
        <ControlConditionField />
      </td>
      <td>
        <ControlCondtionOperator />
      </td>
      <td>
        <ControlConditionValueForm />
      </td>
    </ControlConditionContext.Provider>
  );
};