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
});

export default (props: {
  listIndex: number
  configIndex: number
  formFieldsInfo: FormFieldsInfo[]
}) => {
  const list = useRecoilValue(fieldControlList);
  const [fieldError, setFieldError] = useState(false);
  const [fieldType, setFieldType] = useState(() => {
    if(list[props.listIndex].config[props.configIndex].field) {
      const result = props.formFieldsInfo.filter(e => e.code === list[props.listIndex].config[props.configIndex].field);
      if(result.length) {
        return result[0].type;
      } else {
        // 「制限対象フィールド」に設定していたフィールド情報がない
        setFieldError(true);
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
        setFieldType
      }}>
      <td>
        <ControlConditionField error={fieldError} />
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