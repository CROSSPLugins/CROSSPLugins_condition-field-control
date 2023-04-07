import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { fieldControlList } from '../store';
import KintoneDropDown from './KintoneDropDown';
import { FormFieldsInfo } from '../../type';
import { deepcp } from '../utils';

const filteringFormFields = (formFieldsInfo: FormFieldsInfo[]) => {
  return formFieldsInfo.filter(e => {
    switch(e.type) {
      case 'CALC':
      case 'CATEGORY':
      case 'CHECK_BOX':
      case 'CREATED_TIME':
      case 'DATE':
      case 'DATETIME':
      case 'DROP_DOWN':
      case 'LINK':
      case 'MULTI_LINE_TEXT':
      case 'MULTI_SELECT':
      case 'NUMBER':
      case 'RADIO_BUTTON':
      case 'RECORD_NUMBER':
      case 'SINGLE_LINE_TEXT':
      case 'TIME':
      case 'UPDATED_TIME':
        return true;
      default:
        return false;
    }
  });
};

const switchingOperator = (fieldType: string) => {
  switch(fieldType) {
    case 'SINGLE_LINE_TEXT':
    case 'LINK':
    case 'CATEGORY':
      return ['＝（等しい）', '≠（等しくない）', '次のキーワードを含む', '次のキーワードを含まない'].map(e => ({ value: e, text: e }));
    case 'NUMBER':
    case 'CALC':
    case 'RECORD_NUMBER':
      return ['＝（等しい）', '≠（等しくない）', '＞（以上）', '＜（以下）'].map(e => ({ value: e, text: e }));
    case 'MULTI_LINE_TEXT':
      return ['次のキーワードを含む', '次のキーワードを含まない'].map(e => ({ value: e, text: e }));
    case 'CHECK_BOX':
    case 'RADIO_BUTTON':
    case 'DROP_DOWN':
    case 'MULTI_SELECT':
      return ['次のいずれかを含む', '次のいずれかを含まない'].map(e => ({ value: e, text: e }));
    case 'DATE':
    case 'TIME':
    case 'DATETIME':
    case 'CREATED_TIME':
    case 'UPDATED_TIME':
      return ['＝（等しい）', '≠（等しくない）', '≧（以降）', '≦（以前）'].map(e => ({ value: e, text: e }));
    default:
      if(fieldType !== '') throw new Error('想定外のエラーが発生しました。');
      return [];
  }
};

export default (props: {
  listIndex: number
  configIndex: number
  formFieldsInfo: FormFieldsInfo[]
}) => {
  const [fieldType, setFieldType] = useState('');
  const [list, setList] = useRecoilState(fieldControlList);

  return (
    <>
      <td>
        <KintoneDropDown 
          value={list[props.listIndex].config[props.configIndex].field ?? ''}
          options={
            filteringFormFields(props.formFieldsInfo).map(e => ({ value: e.code, text: e.label }))
          }
          onChange={(value) => {
            setFieldType(props.formFieldsInfo.find(e => e.code === value)?.type ?? '');
            const _list = deepcp(list);
            _list[props.listIndex].config[props.configIndex].field = value as string;
            setList(_list);
          }}
          unselectValue
        />
      </td>
      <td>
        <KintoneDropDown 
          value={list[props.listIndex].config[props.configIndex].op ?? ''}
          options={switchingOperator(fieldType)}
          onChange={(value) => {
            const _list = deepcp(list);
            _list[props.listIndex].config[props.configIndex].op = value as string;
            setList(_list);
          }}
        />
      </td>
      <td>
      </td>
    </>
  );
};